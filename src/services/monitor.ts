import { PublicClient } from 'viem';
import { Duration, startOfHour, sub } from 'date-fns';
import { findBlockForTimestamp } from '@/utils/blocks.js';
import { Rpc } from './rpc.js';
import { Kysely } from 'kysely';
import { DB, PoolReserve } from '@/db/types.js';
import { Backfiller } from './backfiller.js';
import cron from 'node-cron';
import { queries } from '@/db/queries.js';
import logger from '@/utils/logger.js';

type PoolType = 'uniswap' | 'curve';

type Pool = {
    address: string;
    type: PoolType;
}

function durationToMinutes(duration: Duration): number {
    // Convert to minutes
    const minutes = (duration.days ?? 0) * 24 * 60 +
        (duration.hours ?? 0) * 60 +
        (duration.minutes ?? 0);

    return minutes;
}

export class Monitor {
    private client: PublicClient;
    private db: Kysely<DB>;
    private pools: Pool[];
    private networkId: number;
    private backfiller: Backfiller;
    private isRunning: boolean = false;
    private rpc: Rpc;
    private pollingInterval: number;
    private backfillSince: Date;

    constructor(
        client: PublicClient,
        pools: Pool[],
        db: Kysely<DB>,
        params: {
            pollingInterval: Duration,
            backfillPeriod: Duration,
        }
    ) {
        this.pollingInterval = durationToMinutes(params.pollingInterval);
        this.backfillSince = sub(new Date(), params.backfillPeriod);
        this.db = db;
        this.client = client;
        this.rpc = new Rpc(this.client);
        this.networkId = this.rpc.networkId;
        this.backfiller = new Backfiller(this.rpc, this.db);
        this.pools = pools;
    }

    async backfill(startDate: Date, endDate: Date) {
        logger.info(`Backfilling from ${startDate} to ${endDate}`, { startDate, endDate });

        // TODO: optimize, multicall and parallelize
        await this.backfiller.backfillBlocks(startDate, endDate);
        for (const pool of this.pools) {
            logger.info(`Backfilling pool reserves for ${pool.address}`, { poolAddress: pool.address });
            await this.backfiller.backfillPoolReserves(pool.address, pool.type, startDate, endDate);
        }
    }

    async start() {
        // before starting the monitor, backfill missing datapoints/blocks
        const startDate = this.backfillSince;
        const endDate = new Date();
        await this.backfill(startDate, endDate);

        if (this.isRunning) return;
        this.isRunning = true;

        cron.schedule(`*/${this.pollingInterval} * * * *`, async () => {
            const date = startOfHour(new Date());
            const timestamp = BigInt(Math.floor(date.getTime() / 1000));
            const block = await findBlockForTimestamp(this.client, timestamp, 1n, await this.rpc.getLatestBlock());

            let reserves: PoolReserve[] = [];

            for (const pool of this.pools) {
                let reserveAtBlock: {
                    block_number: number;
                    token0_reserves: string;
                    token1_reserves: string;
                };
                switch (pool.type) {
                    case 'uniswap':
                        reserveAtBlock = await this.rpc.getUniswapReservesAtBlock(pool.address, Number(block));
                        reserves.push({
                            ...reserveAtBlock,
                            time: date,
                            network_id: this.networkId,
                            pool_address: pool.address,
                        });
                        break;
                    case 'curve':
                        reserveAtBlock = await this.rpc.getCurveReservesAtBlock(pool.address, Number(block));
                        reserves.push({
                            ...reserveAtBlock,
                            time: date,
                            network_id: this.networkId,
                            pool_address: pool.address,
                        });
                        break;
                }
            }

            await queries.upsertPoolReserves(this.db, reserves);
        });
    }

    stop() {
        this.isRunning = false;
    }

} 
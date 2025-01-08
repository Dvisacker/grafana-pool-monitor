import { DB } from "@/db/types.js";
import { Kysely } from "kysely";
import { Rpc } from "./rpc.js";
import { queries } from "@/db/queries.js";
import logger from "@/utils/logger.js";

export class Backfiller {
    private rpc: Rpc;
    private db: Kysely<DB>;

    constructor(rpc: Rpc, db: Kysely<DB>) {
        this.rpc = rpc;
        this.db = db;
    }

    async backfillBlocks(startDate: Date, endDate: Date) {
        logger.info('Starting block backfill', { startDate, endDate });
        try {
            const datedBlocks = await this.rpc.getDatedBlocks(startDate, endDate);
            logger.debug(`Retrieved ${datedBlocks.length} blocks`);
            await queries.upsertDatedBlocks(this.db, datedBlocks);
            logger.info('Successfully completed block backfill', {
                startDate,
                endDate,
                blocksCount: datedBlocks.length
            });
        } catch (error) {
            logger.error('Failed to backfill blocks', {
                startDate,
                endDate,
                error: error instanceof Error ? error.message : String(error)
            });
            throw error;
        }
    }

    async backfillPoolReserves(poolAddress: string, poolType: 'uniswap' | 'curve', startDate: Date, endDate: Date, blockInterval: number) {
        logger.info('Starting pool reserves backfill', {
            poolAddress,
            poolType,
            startDate,
            endDate
        });
        try {
            const blocks = await this.rpc.getBlocksAtIntervals(startDate, endDate, blockInterval);
            logger.info(`Retrieved ${blocks.length} blocks`);
            const reserves = await this.rpc.getHistoricalReservesAtBlocks(poolAddress, poolType, blocks);
            logger.debug(`Retrieved ${reserves.length} reserve entries`);
            await queries.upsertPoolReserves(this.db, reserves);
            logger.info('Successfully completed pool reserves backfill', {
                poolAddress,
                poolType,
                startDate,
                endDate,
                reservesCount: reserves.length
            });
        } catch (error) {
            logger.error('Failed to backfill pool reserves', {
                poolAddress,
                poolType,
                startDate,
                endDate,
                error: error instanceof Error ? error.message : String(error)
            });
            throw error;
        }
    }
}
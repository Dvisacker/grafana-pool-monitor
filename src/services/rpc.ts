import { PoolReserve } from "@/db/types.js";
import { getDatedBlocks } from "@/utils/blocks.js";
import { curvePoolAbi, uniswapV2PoolAbi } from '../generated.js';
import { PublicClient } from "viem";
import logger from '@/utils/logger.js';


export class Rpc {
    private client: PublicClient;
    public networkId: number;

    constructor(client: PublicClient) {
        this.client = client;
        if (!client.chain) {
            throw new Error('Client is not connected to a chain');
        }
        this.networkId = client.chain.id;
    }

    async getDatedBlocks(startDate: Date, endDate: Date) {
        logger.debug(`Getting block dates from ${startDate} to ${endDate}`, { startDate, endDate });
        return getDatedBlocks(this.client, startDate, endDate);
    }

    async getBlockNumber() {
        return this.client.getBlockNumber();
    }

    async getLatestBlock() {
        return this.client.getBlockNumber();
    }

    async getHistoricalReserves(poolAddress: string, poolType: 'uniswap' | 'curve', startDate: Date, endDate: Date) {
        const datedBlocks = await this.getDatedBlocks(startDate, endDate);
        let reserves: PoolReserve[] = [];
        switch (poolType) {
            case 'uniswap':
                reserves = await Promise.all(datedBlocks.map(async ({ date, block_number }) => {
                    const reserves = await this.getUniswapReservesAtBlock(poolAddress, block_number);
                    return {
                        time: date,
                        network_id: this.networkId,
                        pool_address: poolAddress,
                        ...reserves,
                    };
                }));
                break;
            case 'curve':
                reserves = await Promise.all(datedBlocks.map(async ({ date, block_number }) => {
                    const reserves = await this.getCurveReservesAtBlock(poolAddress, block_number);
                    return {
                        time: date,
                        network_id: this.networkId,
                        pool_address: poolAddress,
                        ...reserves,
                    };
                }));
                break;
        }

        return reserves;
    }

    async getUniswapReservesAtBlock(poolAddress: string, blockNumber: number) {
        const reserves = await this.client.readContract({
            address: poolAddress as `0x${string}`,
            abi: uniswapV2PoolAbi,
            functionName: 'getReserves',
            blockNumber: BigInt(blockNumber)
        }) as [bigint, bigint, number];

        const [reserve0, reserve1] = reserves;
        return {
            block_number: blockNumber,
            token0_reserves: reserve0.toString(),
            token1_reserves: reserve1.toString(),
        };
    }

    async getCurveReservesAtBlock(poolAddress: string, blockNumber: number) {
        const reserves = await this.client.readContract({
            address: poolAddress as `0x${string}`,
            abi: curvePoolAbi,
            functionName: 'get_balances',
            blockNumber: BigInt(blockNumber)
        }) as [bigint, bigint, number];

        const [reserve0, reserve1] = reserves;
        return {
            block_number: blockNumber,
            token0_reserves: reserve0.toString(),
            token1_reserves: reserve1.toString(),
        };
    }
}

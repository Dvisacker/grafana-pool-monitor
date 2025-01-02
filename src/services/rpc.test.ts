import { createPublicClient, http, type PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { Rpc } from './rpc.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RPC_URL) {
    throw new Error('RPC_URL environment variable is required');
}

describe('Rpc', () => {
    let rpc: Rpc;
    let client: PublicClient;

    beforeEach(() => {
        client = createPublicClient({
            chain: mainnet,
            transport: http(process.env.RPC_URL),
        });
        rpc = new Rpc(client);
    });

    describe('getDatedBlocks', () => {
        it('should return blocks for the given date range', async () => {
            const startDate = new Date('2024-11-01T00:00:00Z');
            const endDate = new Date('2024-11-01T03:59:59Z');

            const blocks = await rpc.getDatedBlocks(startDate, endDate);

            expect(blocks).toHaveLength(4);
            expect(blocks[0].date).toEqual(new Date('2024-11-01T00:00:00Z'));
            expect(blocks[0].block_number).toBe(21089069n);
            expect(blocks[3].date).toEqual(new Date('2024-11-01T03:00:00Z'));
            expect(blocks[3].block_number).toBe(21089965n);
        }, 50000);
    });

    describe('getBlockNumber', () => {
        it('should return current block number', async () => {
            const blockNumber = await rpc.getBlockNumber();
            expect(typeof blockNumber).toBe('bigint');
            expect(blockNumber).toBeGreaterThan(0n);
        });
    });

    describe('getHistoricalReserves', () => {
        const uniswapPoolAddress = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'; // USDC/ETH pool
        const curvePoolAddress = '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'; // 3pool

        it('should fetch historical uniswap reserves', async () => {
            const startDate = new Date('2024-11-01T00:00:00Z');
            const endDate = new Date('2024-11-01T01:00:00Z');

            const reserves = await rpc.getHistoricalReserves(
                uniswapPoolAddress,
                'uniswap',
                startDate,
                endDate
            );

            expect(reserves).toHaveLength(2);
            reserves.forEach(reserve => {
                expect(reserve.block_number).toBeDefined();
                expect(reserve.token0_reserves).toBeDefined();
                expect(reserve.token1_reserves).toBeDefined();
            });
        }, 50000);

        it('should fetch historical curve reserves', async () => {
            const startDate = new Date('2024-11-01T00:00:00Z');
            const endDate = new Date('2024-11-01T01:00:00Z');

            const reserves = await rpc.getHistoricalReserves(
                curvePoolAddress,
                'curve',
                startDate,
                endDate
            );

            expect(reserves).toHaveLength(2);
            reserves.forEach(reserve => {
                expect(reserve.block_number).toBeDefined();
                expect(reserve.token0_reserves).toBeDefined();
                expect(reserve.token1_reserves).toBeDefined();
            });
        }, 50000);
    });

    describe('getUniswapReservesAtBlock', () => {
        it('should fetch uniswap reserves at specific block', async () => {
            const poolAddress = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'; // USDC/ETH pool
            const blockNumber = 21089069;

            const reserves = await rpc.getUniswapReservesAtBlock(poolAddress, blockNumber);

            expect(reserves.block_number).toBe(blockNumber);
            expect(typeof reserves.token0_reserves).toBe('string');
            expect(typeof reserves.token1_reserves).toBe('string');
        }, 50000);
    });

    describe('getCurveReservesAtBlock', () => {
        it('should fetch curve reserves at specific block', async () => {
            const poolAddress = '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'; // 3pool
            const blockNumber = 21089069;

            const reserves = await rpc.getCurveReservesAtBlock(poolAddress, blockNumber);

            expect(reserves.block_number).toBe(blockNumber);
            expect(typeof reserves.token0_reserves).toBe('string');
            expect(typeof reserves.token1_reserves).toBe('string');
        }, 50000);
    });
}); 
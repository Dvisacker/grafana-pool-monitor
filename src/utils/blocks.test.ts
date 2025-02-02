/// <reference types="jest" />

import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { findBlockForDate, findBlockForTimestamp, getBlockRange, getBlocksAtIntervals, getDatedBlocks } from './blocks.js';
import dotenv from 'dotenv';

dotenv.config();

const timestamp = BigInt(new Date('2024-11-01T00:00:00Z').getTime() / 1000);

describe('findBlockForTimestamp', () => {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(process.env.RPC_URL),
    });

    test('should find the correct block for a known timestamp', async () => {
        // Search in a range of 1000 blocks around the known block
        const startBlock = 1n;
        const endBlock = 21534663n;

        const foundBlock = await findBlockForTimestamp(
            client,
            timestamp,
            startBlock,
            endBlock
        );

        expect(foundBlock).toBe(21089069n);
    }, 10000);
});

describe('findBlockForDate', () => {
    test('should find the correct block for a known date', async () => {
        const client = createPublicClient({
            chain: mainnet,
            transport: http(process.env.RPC_URL),
        });

        const foundBlock = await findBlockForDate(client, new Date('2024-11-02T00:00:00Z'), 1n, 21534663n);
        expect(foundBlock).toBe(21089069n);
    }, 10000);

    test('should find the correct block for a known date 2', async () => {
        const client = createPublicClient({
            chain: mainnet,
            transport: http(process.env.RPC_URL),
        });

        const latestBlock = await client.getBlockNumber();
        const foundBlock = await findBlockForDate(client, new Date('2024-12-31T00:00:00Z'), 1n, latestBlock);
        expect(foundBlock).toBe(21089069n);
    }, 10000);
});

describe('getBlockNumbersSince', () => {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(process.env.RPC_URL),
    });

    test('should return the correct block numbers for each hour between startDate and endDate', async () => {
        const startDate = new Date('2024-11-01T00:00:00Z');
        const endDate = new Date('2024-11-01T03:59:59Z');
        const datedBlocks = await getDatedBlocks(client, startDate, endDate);
        expect(datedBlocks).toHaveLength(4);
        expect(datedBlocks[0].date).toEqual(new Date('2024-11-01T00:00:00Z'));
        expect(datedBlocks[0].block_number).toEqual(21089069);
        expect(datedBlocks[1].date).toEqual(new Date('2024-11-01T01:00:00Z'));
        expect(datedBlocks[1].block_number).toEqual(21089369);
        expect(datedBlocks[2].date).toEqual(new Date('2024-11-01T02:00:00Z'));
        expect(datedBlocks[2].block_number).toEqual(21089668);
        expect(datedBlocks[3].date).toEqual(new Date('2024-11-01T03:00:00Z'));
        expect(datedBlocks[3].block_number).toEqual(21089965);

    }, 50000);
});

describe('getBlockRange', () => {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(process.env.RPC_URL),
    });

    test('should return the correct block numbers for each hour between startDate and endDate', async () => {
        const startDate = new Date('2024-11-01T00:00:00Z');
        const endDate = new Date('2024-11-01T03:59:59Z');
        const datedBlocks = await getBlockRange(client, startDate, endDate, 100);
        // expect(datedBlocks).toHaveLength(4);
        console.log(datedBlocks);
    }, 50000);
});


describe('getBlocksAtIntervals', () => {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(process.env.RPC_URL),
    });

    test('should return the correct block numbers for each hour between startDate and endDate', async () => {
        const startDate = new Date('2024-11-01T00:00:00Z');
        const endDate = new Date('2024-11-01T03:59:59Z');
        const datedBlocks = await getBlocksAtIntervals(client, startDate, endDate, 100);
        console.log(datedBlocks);
        // expect(datedBlocks).toHaveLength(4);
    }, 50000);
});

import { PublicClient } from 'viem';
import { addHours, differenceInHours, startOfHour } from 'date-fns';
import { DatedBlock } from '@/db/types.js';
import logger from './logger.js';

export function dateToTimestamp(date: Date): bigint {
    return BigInt(Math.floor(date.getTime() / 1000)); // Convert to seconds
}

export function timestampToDate(timestamp: bigint): Date {
    return new Date(Number(timestamp) * 1000); // Convert from seconds to milliseconds
}

export async function findBlockForDate(
    client: PublicClient,
    targetDate: Date,
    startBlock: bigint,
    endBlock: bigint
): Promise<bigint> {
    const targetTimestamp = BigInt(Math.floor(targetDate.getTime() / 1000));
    return findBlockForTimestamp(client, targetTimestamp, startBlock, endBlock);
}

export async function findBlockForTimestamp(
    client: PublicClient,
    targetTimestamp: bigint,
    startBlock?: bigint,
    endBlock?: bigint
): Promise<bigint> {
    startBlock = startBlock ?? 1n;
    endBlock = endBlock ?? await client.getBlockNumber();
    const startBlockData = await client.getBlock({ blockNumber: startBlock });
    const endBlockData = await client.getBlock({ blockNumber: endBlock });

    const startTimestamp = startBlockData.timestamp;
    const endTimestamp = endBlockData.timestamp;
    const blockDiff = endBlock - startBlock;

    if (startTimestamp >= endTimestamp) {
        return startBlock;
    }

    const timeDiff = Number(targetTimestamp - startTimestamp);
    const averageBlockTime = Number(endTimestamp - startTimestamp) / Number(blockDiff);
    const estimatedBlocks = BigInt(Math.floor(timeDiff / averageBlockTime));
    const estimatedBlock = startBlock + estimatedBlocks;
    const guessBlock = estimatedBlock < endBlock ?
        (estimatedBlock > startBlock ? estimatedBlock : startBlock) : endBlock;

    const block = await client.getBlock({ blockNumber: guessBlock });
    const guessTimestamp = block.timestamp;

    if (guessTimestamp === targetTimestamp || startBlock >= endBlock) {
        return guessBlock;
    }

    if (guessTimestamp < targetTimestamp) {
        return findBlockForTimestamp(client, targetTimestamp, guessBlock + 1n, endBlock);
    }

    return findBlockForTimestamp(client, targetTimestamp, startBlock, guessBlock - 1n);
}

// This functions gets a list of blocks that are closest to a list of given dates
export async function getDatedBlocks(
    client: PublicClient,
    startDate: Date,
    endDate: Date = new Date()
): Promise<DatedBlock[]> {
    const normalizedStartDate = startOfHour(startDate);
    const normalizedEndDate = startOfHour(endDate);
    const hoursDiff = differenceInHours(normalizedEndDate, normalizedStartDate);
    const networkId = client.chain?.id || 1;

    const dates = Array.from({ length: hoursDiff + 1 }, (_, i) =>
        addHours(normalizedStartDate, i)
    );

    const latestBlock = await client.getBlockNumber();

    let startBlock = 1n;
    const blockNumbers: DatedBlock[] = [];
    for (const date of dates) {
        const targetTimestamp = BigInt(Math.floor(date.getTime() / 1000));
        const blockNumber = await findBlockForTimestamp(client, targetTimestamp, startBlock, latestBlock);
        logger.info(`Found block ${blockNumber} for date ${date}`, { blockNumber, date });
        startBlock = blockNumber;
        blockNumbers.push({ date, block_number: Number(blockNumber), network_id: networkId, timestamp: Number(targetTimestamp) });
    }

    return blockNumbers;
}

export async function getBlockRange(
    client: PublicClient,
    startDate: Date,
    endDate: Date,
    interval: number
): Promise<DatedBlock[]> {
    const latestBlock = await client.getBlock();
    const startTimestamp = dateToTimestamp(startDate);
    const endTimestamp = dateToTimestamp(endDate);
    const firstBlockNumber = await findBlockForTimestamp(client, startTimestamp, 1n, latestBlock.number);
    const chainId = client.chain?.id || 1;

    let block = await client.getBlock({ blockNumber: firstBlockNumber });
    let blocks: DatedBlock[] = [{ date: timestampToDate(block.timestamp), block_number: Number(firstBlockNumber), network_id: chainId, timestamp: Number(block.timestamp) }];

    while (block.timestamp < endTimestamp) {
        block = await client.getBlock({ blockNumber: block.number + BigInt(interval) });
        blocks.push({ date: timestampToDate(block.timestamp), block_number: Number(block.number), network_id: chainId, timestamp: Number(block.timestamp) });
    }
    return blocks;
}

export async function getBlocksAtIntervals(
    client: PublicClient,
    startDate: Date,
    endDate: Date,
    interval: number
): Promise<DatedBlock[]> {
    const latestBlock = await client.getBlock();
    const startTimestamp = dateToTimestamp(startDate);
    const endTimestamp = dateToTimestamp(endDate);
    const blockAtStartTimestamp = await findBlockForTimestamp(client, startTimestamp, 1n, latestBlock.number);
    const blockAtStartInterval = blockAtStartTimestamp - blockAtStartTimestamp % BigInt(interval);
    const chainId = client.chain?.id || 1;

    let block = await client.getBlock({ blockNumber: blockAtStartInterval });
    let blocks: DatedBlock[] = [{ date: timestampToDate(block.timestamp), block_number: Number(blockAtStartInterval), network_id: chainId, timestamp: Number(block.timestamp) }];

    while (block.timestamp < endTimestamp) {
        block = await client.getBlock({ blockNumber: block.number + BigInt(interval) });
        console.log(block);
        blocks.push({ date: timestampToDate(block.timestamp), block_number: Number(block.number), network_id: chainId, timestamp: Number(block.timestamp) });
    }
    return blocks;
}


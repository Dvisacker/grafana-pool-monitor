import { PublicClient } from 'viem';
import { addHours, differenceInDays, differenceInHours, startOfDay, startOfHour } from 'date-fns';

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
    startBlock: bigint,
    endBlock: bigint
): Promise<bigint> {
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

export async function getDatedBlocks(
    client: PublicClient,
    startDate: Date,
    endDate: Date = new Date()
): Promise<{ date: Date; blockNumber: bigint }[]> {
    const normalizedStartDate = startOfHour(startDate);
    const normalizedEndDate = startOfHour(endDate);
    const hoursDiff = differenceInHours(normalizedEndDate, normalizedStartDate);

    const dates = Array.from({ length: hoursDiff + 1 }, (_, i) =>
        addHours(normalizedStartDate, i)
    );

    const latestBlock = await client.getBlockNumber();

    let startBlock = 1n;
    const blockNumbers: { date: Date; blockNumber: bigint }[] = [];
    for (const date of dates) {
        const targetTimestamp = BigInt(Math.floor(date.getTime() / 1000));
        const blockNumber = await findBlockForTimestamp(client, targetTimestamp, startBlock, latestBlock);
        startBlock = blockNumber;
        blockNumbers.push({ date, blockNumber });
    }

    return blockNumbers;
}

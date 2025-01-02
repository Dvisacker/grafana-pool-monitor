import { Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';
import type { DB } from './types.js';
import type { PoolReserve } from './types.js';
import type { DatedBlock } from './types.js';

// Create database instance
export const createDB = (config: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}) => {
    const dialect = new PostgresDialect({
        pool: new Pool(config)
    });

    return new Kysely<DB>({
        dialect,
    });
};

// Query functions
export const queries = {

    // insert multiple dated blocks, updating existing ones
    async upsertDatedBlocks(db: Kysely<DB>, data: DatedBlock[]) {
        await db.insertInto('dated_blocks').values(data).onConflict((b) => b.doNothing()).execute();
    },

    async upsertPoolReserves(db: Kysely<DB>, data: PoolReserve[]) {
        await db
            .insertInto('pool_reserves')
            .values(data)
            .onConflict((b) => b.doNothing())
            .execute();
    },

    // Get pool reserves for a specific time range
    async getPoolReserves(
        db: Kysely<DB>,
        poolAddress: string,
        startTime: Date,
        endTime: Date,
        networkId: number
    ) {
        return await db
            .selectFrom('pool_reserves')
            .select([
                'time',
                'block_number',
                'token0_reserves',
                'token1_reserves',
            ])
            .where('pool_address', '=', poolAddress)
            .where('network_id', '=', networkId)
            .where('time', '>=', startTime)
            .where('time', '<=', endTime)
            .orderBy('time', 'asc')
            .execute();
    },

    // Get latest block before a specific date
    async getLatestBlockBeforeDate(
        db: Kysely<DB>,
        date: Date,
        networkId: number
    ) {
        return await db
            .selectFrom('dated_blocks')
            .select(['block_number', 'date'])
            .where('network_id', '=', networkId)
            .where('date', '<=', date)
            .orderBy('date', 'desc')
            .limit(1)
            .executeTakeFirst();
    },

    // Get earliest block after a specific date
    async getEarliestBlockAfterDate(
        db: Kysely<DB>,
        date: Date,
        networkId: number
    ) {
        return await db
            .selectFrom('dated_blocks')
            .select(['block_number', 'date'])
            .where('network_id', '=', networkId)
            .where('date', '>=', date)
            .orderBy('date', 'asc')
            .limit(1)
            .executeTakeFirst();
    },
};

export type Queries = typeof queries; 
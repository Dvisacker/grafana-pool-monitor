import { Kysely, PostgresDialect, sql } from 'kysely';
import pg from 'pg';
import type { DB } from './types.js';
import type { PoolReserve } from './types.js';
import type { DatedBlock } from './types.js';
import type { Token } from './types.js';
import type { Pool } from './types.js';

// Create database instance
export const createDB = (config: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}) => {
    const dialect = new PostgresDialect({
        pool: new pg.Pool(config)
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

    // Insert or update tokens
    async upsertTokens(db: Kysely<DB>, tokens: Token[]) {
        await db
            .insertInto('tokens')
            .values(tokens)
            .onConflict((oc) => oc
                .columns(['address', 'network_id'])
                .doUpdateSet({
                    name: (eb) => eb.ref('excluded.name'),
                    symbol: (eb) => eb.ref('excluded.symbol'),
                    decimals: (eb) => eb.ref('excluded.decimals'),
                })
            )
            .execute();
    },

    // Get token by address and network
    async getToken(
        db: Kysely<DB>,
        address: string,
        networkId: number
    ) {
        return await db
            .selectFrom('tokens')
            .selectAll()
            .where('address', '=', address)
            .where('network_id', '=', networkId)
            .executeTakeFirst();
    },

    // Get all tokens for a network
    async getTokensByNetwork(
        db: Kysely<DB>,
        networkId: number
    ) {
        return await db
            .selectFrom('tokens')
            .selectAll()
            .where('network_id', '=', networkId)
            .execute();
    },

    // Insert or update pools
    async upsertPools(db: Kysely<DB>, pools: Pool[]) {
        await db
            .insertInto('pools')
            .values(pools)
            .onConflict((oc) => oc
                .columns(['pool_address', 'network_id'])
                .doUpdateSet({
                    pool_type: (eb) => eb.ref('excluded.pool_type'),
                    token0: (eb) => eb.ref('excluded.token0'),
                    token1: (eb) => eb.ref('excluded.token1'),
                })
            )
            .execute();
    },

    // Get pool by address and network
    async getPool(
        db: Kysely<DB>,
        poolAddress: string,
        networkId: number
    ) {
        return await db
            .selectFrom('pools')
            .selectAll()
            .where('pool_address', '=', poolAddress)
            .where('network_id', '=', networkId)
            .executeTakeFirst();
    },

    // Get all pools for a network
    async getPoolsByNetwork(
        db: Kysely<DB>,
        networkId: number
    ) {
        return await db
            .selectFrom('pools')
            .selectAll()
            .where('network_id', '=', networkId)
            .execute();
    },

    // Get pools by token
    async getPoolsByToken(
        db: Kysely<DB>,
        tokenAddress: string,
        networkId: number
    ) {
        return await db
            .selectFrom('pools')
            .selectAll()
            .where('network_id', '=', networkId)
            .where((eb) => eb.or([
                eb('token0', '=', tokenAddress),
                eb('token1', '=', tokenAddress)
            ]))
            .execute();
    },
};

export type Queries = typeof queries; 
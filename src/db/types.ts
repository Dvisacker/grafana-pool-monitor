import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Block = {
    block_number: number;
    network_id: number;
    /**
     * @kyselyType(number)
     */
    timestamp: number;
};
export type DatedBlock = {
    block_number: number;
    network_id: number;
    /**
     * @kyselyType(number)
     */
    timestamp: number;
    /**
     * @kyselyType(Date)
     */
    date: Date;
};
export type Pool = {
    pool_address: string;
    network_id: number;
    pool_type: string;
    token0: string;
    token1: string;
};
export type PoolReserve = {
    /**
     * @kyselyType(Date)
     */
    time: Date;
    block_number: number;
    network_id: number;
    pool_address: string;
    token0_reserves: string;
    token1_reserves: string;
};
export type Token = {
    address: string;
    network_id: number;
    name: string;
    symbol: string;
    decimals: number;
};
export type DB = {
    blocks: Block;
    dated_blocks: DatedBlock;
    pool_reserves: PoolReserve;
    pools: Pool;
    tokens: Token;
};

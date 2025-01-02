import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type DatedBlock = {
    block_number: number;
    network_id: number;
    /**
     * @kyselyType(Date)
     */
    date: Date;
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
export type DB = {
    dated_blocks: DatedBlock;
    pool_reserves: PoolReserve;
};

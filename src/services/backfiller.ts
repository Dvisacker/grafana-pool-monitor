import { DB } from "@/db/types.js";
import { getDatedBlocks } from "@/utils/blocks.js";
import { Kysely } from "kysely";
import { PublicClient } from "viem";
import { Rpc } from "./rpc.js";
import { queries } from "@/db/queries.js";

export class Backfiller {
    private rpc: Rpc;
    private db: Kysely<DB>;

    constructor(rpc: Rpc, db: Kysely<DB>) {
        this.rpc = rpc;
        this.db = db;
    }

    async backfillBlocks(startDate: Date, endDate: Date) {
        const datedBlocks = await this.rpc.getDatedBlocks(startDate, endDate);
        await queries.upsertDatedBlocks(this.db, datedBlocks);
    }

    async backfillPoolReserves(poolAddress: string, poolType: 'uniswap' | 'curve', startDate: Date, endDate: Date) {
        const reserves = await this.rpc.getHistoricalReserves(poolAddress, poolType, startDate, endDate);
        await queries.upsertPoolReserves(this.db, reserves);
    }
}
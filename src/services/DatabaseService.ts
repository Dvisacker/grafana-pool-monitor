import { Pool } from 'pg';
import { ReserveData } from '../types';

export class DatabaseService {
    private pool: Pool;

    constructor(connectionConfig: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    }) {
        this.pool = new Pool(connectionConfig);
    }

    async storeReserves(data: ReserveData) {
        const query = `
            INSERT INTO pool_reserves (
                time,
                pool_address,
                token0_reserves,
                token1_reserves,
                block_number,
                virtual_price
            ) VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [
            data.timestamp,
            data.poolAddress,
            data.token0Reserves,
            data.token1Reserves,
            data.blockNumber,
            data.virtualPrice || null, // Optional for Uniswap pools
        ];

        try {
            await this.pool.query(query, values);
        } catch (error) {
            console.error('Error storing reserves:', error);
            throw error;
        }
    }

    async getReserves(
        poolAddress: string,
        startTime: Date,
        endTime: Date,
        interval: string = '1 hour'
    ) {
        const query = `
            SELECT
                time_bucket($1, time) AS bucket,
                pool_address,
                AVG(token0_reserves::numeric) AS avg_token0_reserves,
                AVG(token1_reserves::numeric) AS avg_token1_reserves,
                AVG(virtual_price::numeric) AS avg_virtual_price,
                COUNT(*) AS sample_count
            FROM pool_reserves
            WHERE pool_address = $2
                AND time >= $3
                AND time <= $4
            GROUP BY bucket, pool_address
            ORDER BY bucket ASC
        `;

        const values = [interval, poolAddress, startTime, endTime];

        try {
            const result = await this.pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error fetching reserves:', error);
            throw error;
        }
    }

    async close() {
        await this.pool.end();
    }
} 
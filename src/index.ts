import dotenv from 'dotenv';
import { Monitor } from './services/monitor.js';
import { Config } from './types.js';
import { mainnet } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { createDB } from './db/queries.js';
import logger from '@/utils/logger.js';

dotenv.config();

async function main() {
    const config: Config = {
        rpc: {
            url: process.env.RPC_URL!,
        },
        pool: {
            address: process.env.POOL_ADDRESS!,
            type: process.env.POOL_TYPE as 'uniswap' | 'curve',
            pollingInterval: { hours: 1 },
            backfillPeriod: { days: 7 },
        },
        db: {
            host: process.env.DB_HOST!,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
        },
    };

    const client = createPublicClient({
        chain: mainnet,
        transport: http(config.rpc.url),
    });
    const pools = [
        {
            address: config.pool.address,
            type: config.pool.type,
        },
    ];
    const db = createDB(config.db);
    const monitor = new Monitor(
        client,
        pools,
        db,
        {
            pollingInterval: config.pool.pollingInterval,
            backfillPeriod: config.pool.backfillPeriod,
        }
    );

    // Handle shutdown gracefully
    process.on('SIGINT', async () => {
        logger.info('Shutting down...');
        monitor.stop();
        process.exit(0);
    });

    logger.info(`Starting pool monitor for ${config.pool.address}`, { poolAddress: config.pool.address });
    await monitor.start();
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
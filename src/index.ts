import dotenv from 'dotenv';
import { DatabaseService } from './services/DatabaseService.js';
import { PoolMonitor } from './services/PoolMonitor.js';
import { Config } from './types.js';

dotenv.config();

async function main() {
    // Load configuration from environment variables
    const config: Config = {
        rpc: {
            url: process.env.RPC_URL!,
        },
        pool: {
            address: process.env.POOL_ADDRESS!,
            type: process.env.POOL_TYPE as 'uniswap' | 'curve',
            pollingInterval: parseInt(process.env.POLLING_INTERVAL || '60000'),
        },
        database: {
            host: process.env.DB_HOST!,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
        },
    };

    // Initialize services
    const db = new DatabaseService(config.database);
    const monitor = new PoolMonitor(
        config.rpc.url,
        config.pool.address,
        config.pool.type,
        db,
        config.pool.pollingInterval
    );

    // Handle shutdown gracefully
    process.on('SIGINT', async () => {
        console.log('Shutting down...');
        monitor.stop();
        await db.close();
        process.exit(0);
    });

    // Start monitoring
    console.log(`Starting pool monitor for ${config.pool.address}`);
    await monitor.start();
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
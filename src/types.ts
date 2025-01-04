import { Duration } from 'date-fns';

export interface Config {
    rpc: {
        url: string;
    };
    pool: {
        address: string;
        type: 'uniswap' | 'curve';
        pollingInterval: Duration;
        backfillPeriod: Duration;
    };
    db: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
} 
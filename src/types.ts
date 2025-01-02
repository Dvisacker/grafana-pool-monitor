export interface Config {
    rpc: {
        url: string;
    };
    pool: {
        address: string;
        type: 'uniswap' | 'curve';
        pollingInterval: number;
    };
    db: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
} 
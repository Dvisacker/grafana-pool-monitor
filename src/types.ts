export interface ReserveData {
    poolAddress: string;
    token0Reserves: string;
    token1Reserves: string;
    blockNumber: bigint;
    timestamp: Date;
    virtualPrice?: string; // Optional for Curve pools
}

export interface Config {
    rpc: {
        url: string;
    };
    pool: {
        address: string;
        type: 'uniswap' | 'curve';
        pollingInterval: number;
    };
    database: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
} 
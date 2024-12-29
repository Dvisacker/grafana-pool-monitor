import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { DatabaseService } from '../services/DatabaseService.js';
import { curvePoolAbi, uniswapV2PoolAbi } from '../generated.js';

type PoolType = 'uniswap' | 'curve';

export class PoolMonitor {
    private client;
    private db: DatabaseService;
    private poolAddress: string;
    private poolType: PoolType;
    private pollingInterval: number;
    private isRunning: boolean = false;

    constructor(
        rpcUrl: string,
        poolAddress: string,
        poolType: PoolType,
        db: DatabaseService,
        pollingInterval: number
    ) {
        this.client = createPublicClient({
            chain: mainnet,
            transport: http(rpcUrl),
        });
        this.poolAddress = poolAddress;
        this.poolType = poolType;
        this.db = db;
        this.pollingInterval = pollingInterval;
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;

        while (this.isRunning) {
            try {
                if (this.poolType === 'uniswap') {
                    await this.fetchAndStoreUniswapReserves();
                } else {
                    await this.fetchAndStoreCurveReserves();
                }
            } catch (error) {
                console.error('Error fetching reserves:', error);
            }

            await new Promise(resolve => setTimeout(resolve, this.pollingInterval));
        }
    }

    stop() {
        this.isRunning = false;
    }

    private async fetchAndStoreUniswapReserves() {
        const [reserves, blockNumber] = await Promise.all([
            this.client.readContract({
                address: this.poolAddress as `0x${string}`,
                abi: uniswapV2PoolAbi,
                functionName: 'getReserves',
            }) as Promise<[bigint, bigint, number]>,
            this.client.getBlockNumber(),
        ]);

        const [reserve0, reserve1] = reserves;

        await this.db.storeReserves({
            poolAddress: this.poolAddress,
            token0Reserves: reserve0.toString(),
            token1Reserves: reserve1.toString(),
            blockNumber: blockNumber,
            timestamp: new Date(),
        });
    }

    private async fetchAndStoreCurveReserves() {
        const [balances, virtualPrice, blockNumber] = await Promise.all([
            this.client.readContract({
                address: this.poolAddress as `0x${string}`,
                abi: curvePoolAbi,
                functionName: 'get_balances',
            }) as Promise<bigint[]>,
            this.client.readContract({
                address: this.poolAddress as `0x${string}`,
                abi: curvePoolAbi,
                functionName: 'get_virtual_price',
            }) as Promise<bigint>,
            this.client.getBlockNumber(),
        ]);

        // For Curve pools, we'll store both tokens' reserves and the virtual price
        await this.db.storeReserves({
            poolAddress: this.poolAddress,
            token0Reserves: balances[0].toString(),
            token1Reserves: balances[1].toString(),
            blockNumber: blockNumber,
            timestamp: new Date(),
            virtualPrice: virtualPrice.toString(),
        });
    }
} 
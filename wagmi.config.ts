import { defineConfig } from '@wagmi/cli'
import { actions, etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
    out: 'src/generated.ts',
    contracts: [
        {
            name: 'UniswapV2Pool',
            abi: [
                {
                    "inputs": [],
                    "name": "getReserves",
                    "outputs": [
                        {
                            "internalType": "uint112",
                            "name": "reserve0",
                            "type": "uint112"
                        },
                        {
                            "internalType": "uint112",
                            "name": "reserve1",
                            "type": "uint112"
                        },
                        {
                            "internalType": "uint32",
                            "name": "blockTimestampLast",
                            "type": "uint32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "token0",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "token1",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        }
    ],
    plugins: [
        actions(),
        etherscan({
            apiKey: process.env.ETHERSCAN_API_KEY!,
            contracts: [
                {
                    name: 'CurvePool',
                    address: '0x14100f81e33c33ecc7cdac70181fb45b6e78569f'
                }
            ],
            chainId: 1,
        })
    ]
}); 
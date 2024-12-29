import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from '@wagmi/core/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CurvePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const curvePoolAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'receiver', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'int128', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'int128', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false },
    ],
    name: 'TokenExchange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'sold_id', type: 'int128', indexed: false },
      { name: 'tokens_sold', type: 'uint256', indexed: false },
      { name: 'bought_id', type: 'int128', indexed: false },
      { name: 'tokens_bought', type: 'uint256', indexed: false },
    ],
    name: 'TokenExchangeUnderlying',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[]', indexed: false },
      { name: 'fees', type: 'uint256[]', indexed: false },
      { name: 'invariant', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false },
    ],
    name: 'AddLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[]', indexed: false },
      { name: 'fees', type: 'uint256[]', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false },
    ],
    name: 'RemoveLiquidity',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_id', type: 'int128', indexed: false },
      { name: 'token_amount', type: 'uint256', indexed: false },
      { name: 'coin_amount', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false },
    ],
    name: 'RemoveLiquidityOne',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'token_amounts', type: 'uint256[]', indexed: false },
      { name: 'fees', type: 'uint256[]', indexed: false },
      { name: 'invariant', type: 'uint256', indexed: false },
      { name: 'token_supply', type: 'uint256', indexed: false },
    ],
    name: 'RemoveLiquidityImbalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'old_A', type: 'uint256', indexed: false },
      { name: 'new_A', type: 'uint256', indexed: false },
      { name: 'initial_time', type: 'uint256', indexed: false },
      { name: 'future_time', type: 'uint256', indexed: false },
    ],
    name: 'RampA',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'A', type: 'uint256', indexed: false },
      { name: 't', type: 'uint256', indexed: false },
    ],
    name: 'StopRampA',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', type: 'uint256', indexed: false },
      { name: 'offpeg_fee_multiplier', type: 'uint256', indexed: false },
    ],
    name: 'ApplyNewFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ma_exp_time', type: 'uint256', indexed: false },
      { name: 'D_ma_time', type: 'uint256', indexed: false },
    ],
    name: 'SetNewMATime',
  },
  {
    type: 'constructor',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_A', type: 'uint256' },
      { name: '_fee', type: 'uint256' },
      { name: '_offpeg_fee_multiplier', type: 'uint256' },
      { name: '_ma_exp_time', type: 'uint256' },
      { name: '_coins', type: 'address[]' },
      { name: '_rate_multipliers', type: 'uint256[]' },
      { name: '_asset_types', type: 'uint8[]' },
      { name: '_method_ids', type: 'bytes4[]' },
      { name: '_oracles', type: 'address[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
    ],
    name: 'exchange',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'exchange',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
    ],
    name: 'exchange_received',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'exchange_received',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amounts', type: 'uint256[]' },
      { name: '_min_mint_amount', type: 'uint256' },
    ],
    name: 'add_liquidity',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amounts', type: 'uint256[]' },
      { name: '_min_mint_amount', type: 'uint256' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'add_liquidity',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' },
      { name: '_min_received', type: 'uint256' },
    ],
    name: 'remove_liquidity_one_coin',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' },
      { name: '_min_received', type: 'uint256' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'remove_liquidity_one_coin',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amounts', type: 'uint256[]' },
      { name: '_max_burn_amount', type: 'uint256' },
    ],
    name: 'remove_liquidity_imbalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amounts', type: 'uint256[]' },
      { name: '_max_burn_amount', type: 'uint256' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'remove_liquidity_imbalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: '_min_amounts', type: 'uint256[]' },
    ],
    name: 'remove_liquidity',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: '_min_amounts', type: 'uint256[]' },
      { name: '_receiver', type: 'address' },
    ],
    name: 'remove_liquidity',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: '_min_amounts', type: 'uint256[]' },
      { name: '_receiver', type: 'address' },
      { name: '_claim_admin_fees', type: 'bool' },
    ],
    name: 'remove_liquidity',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw_admin_fees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'i', type: 'uint256' }],
    name: 'last_price',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'i', type: 'uint256' }],
    name: 'ema_price',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'i', type: 'uint256' }],
    name: 'get_p',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'i', type: 'uint256' }],
    name: 'price_oracle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'D_oracle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_deadline', type: 'uint256' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: 'dy', type: 'uint256' },
    ],
    name: 'get_dx',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: 'dx', type: 'uint256' },
    ],
    name: 'get_dy',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_burn_amount', type: 'uint256' },
      { name: 'i', type: 'int128' },
    ],
    name: 'calc_withdraw_one_coin',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'get_virtual_price',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amounts', type: 'uint256[]' },
      { name: '_is_deposit', type: 'bool' },
    ],
    name: 'calc_token_amount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'A',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'A_precise',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'i', type: 'uint256' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'get_balances',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stored_rates',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
    ],
    name: 'dynamic_fee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_future_A', type: 'uint256' },
      { name: '_future_time', type: 'uint256' },
    ],
    name: 'ramp_A',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stop_ramp_A',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_new_fee', type: 'uint256' },
      { name: '_new_offpeg_fee_multiplier', type: 'uint256' },
    ],
    name: 'set_new_fee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ma_exp_time', type: 'uint256' },
      { name: '_D_ma_time', type: 'uint256' },
    ],
    name: 'set_ma_exp_time',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'N_COINS',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'coins',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'offpeg_fee_multiplier',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'admin_fee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initial_A',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'future_A',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initial_A_time',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'future_A_time',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'admin_balances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ma_exp_time',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'D_ma_time',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ma_last_time',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'salt',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const curvePoolAddress = {
  1: '0x14100f81e33C33Ecc7CDac70181Fb45B6E78569F',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const curvePoolConfig = {
  address: curvePoolAddress,
  abi: curvePoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapV2Pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uniswapV2PoolAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: 'reserve0', internalType: 'uint112', type: 'uint112' },
      { name: 'reserve1', internalType: 'uint112', type: 'uint112' },
      { name: 'blockTimestampLast', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePool = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"last_price"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolLastPrice = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'last_price',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"ema_price"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolEmaPrice = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'ema_price',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"get_p"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolGetP = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'get_p',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"price_oracle"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolPriceOracle = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'price_oracle',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"D_oracle"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolDOracle = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'D_oracle',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolDomainSeparator = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"get_dx"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolGetDx = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'get_dx',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"get_dy"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolGetDy = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'get_dy',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"calc_withdraw_one_coin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolCalcWithdrawOneCoin =
  /*#__PURE__*/ createReadContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'calc_withdraw_one_coin',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolTotalSupply = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"get_virtual_price"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolGetVirtualPrice = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'get_virtual_price',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"calc_token_amount"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolCalcTokenAmount = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'calc_token_amount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolA = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'A',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"A_precise"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolAPrecise = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'A_precise',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"balances"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolBalances = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'balances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"get_balances"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolGetBalances = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'get_balances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"stored_rates"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolStoredRates = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'stored_rates',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"dynamic_fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolDynamicFee = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'dynamic_fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"N_COINS"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolNCoins = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'N_COINS',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"coins"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolCoins = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'coins',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolFee = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"offpeg_fee_multiplier"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolOffpegFeeMultiplier =
  /*#__PURE__*/ createReadContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'offpeg_fee_multiplier',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"admin_fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolAdminFee = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'admin_fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"initial_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolInitialA = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'initial_A',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"future_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolFutureA = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'future_A',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"initial_A_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolInitialATime = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'initial_A_time',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"future_A_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolFutureATime = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'future_A_time',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"admin_balances"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolAdminBalances = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'admin_balances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"ma_exp_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolMaExpTime = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'ma_exp_time',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"D_ma_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolDMaTime = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'D_ma_time',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"ma_last_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolMaLastTime = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'ma_last_time',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolName = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolSymbol = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolDecimals = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"version"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolVersion = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'version',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolBalanceOf = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolAllowance = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolNonces = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"salt"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const readCurvePoolSalt = /*#__PURE__*/ createReadContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'salt',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePool = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"exchange"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolExchange = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'exchange',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"exchange_received"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolExchangeReceived = /*#__PURE__*/ createWriteContract(
  {
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'exchange_received',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"add_liquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolAddLiquidity = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'add_liquidity',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity_one_coin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolRemoveLiquidityOneCoin =
  /*#__PURE__*/ createWriteContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'remove_liquidity_one_coin',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity_imbalance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolRemoveLiquidityImbalance =
  /*#__PURE__*/ createWriteContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'remove_liquidity_imbalance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolRemoveLiquidity = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'remove_liquidity',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"withdraw_admin_fees"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolWithdrawAdminFees =
  /*#__PURE__*/ createWriteContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'withdraw_admin_fees',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolTransfer = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolApprove = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolPermit = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"ramp_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolRampA = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'ramp_A',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"stop_ramp_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolStopRampA = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'stop_ramp_A',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"set_new_fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolSetNewFee = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'set_new_fee',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"set_ma_exp_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const writeCurvePoolSetMaExpTime = /*#__PURE__*/ createWriteContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'set_ma_exp_time',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePool = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"exchange"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolExchange = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'exchange',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"exchange_received"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolExchangeReceived =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'exchange_received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"add_liquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolAddLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'add_liquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity_one_coin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolRemoveLiquidityOneCoin =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'remove_liquidity_one_coin',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity_imbalance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolRemoveLiquidityImbalance =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'remove_liquidity_imbalance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"remove_liquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolRemoveLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'remove_liquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"withdraw_admin_fees"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolWithdrawAdminFees =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'withdraw_admin_fees',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolTransfer = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolApprove = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolPermit = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"ramp_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolRampA = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'ramp_A',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"stop_ramp_A"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolStopRampA = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'stop_ramp_A',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"set_new_fee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolSetNewFee = /*#__PURE__*/ createSimulateContract({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  functionName: 'set_new_fee',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link curvePoolAbi}__ and `functionName` set to `"set_ma_exp_time"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const simulateCurvePoolSetMaExpTime =
  /*#__PURE__*/ createSimulateContract({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    functionName: 'set_ma_exp_time',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: curvePoolAbi,
  address: curvePoolAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"TokenExchange"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolTokenExchangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'TokenExchange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"TokenExchangeUnderlying"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolTokenExchangeUnderlyingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'TokenExchangeUnderlying',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"AddLiquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolAddLiquidityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'AddLiquidity',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"RemoveLiquidity"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolRemoveLiquidityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'RemoveLiquidity',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"RemoveLiquidityOne"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolRemoveLiquidityOneEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'RemoveLiquidityOne',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"RemoveLiquidityImbalance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolRemoveLiquidityImbalanceEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'RemoveLiquidityImbalance',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"RampA"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolRampAEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: curvePoolAbi,
  address: curvePoolAddress,
  eventName: 'RampA',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"StopRampA"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolStopRampAEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'StopRampA',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"ApplyNewFee"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolApplyNewFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'ApplyNewFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link curvePoolAbi}__ and `eventName` set to `"SetNewMATime"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x14100f81e33c33ecc7cdac70181fb45b6e78569f)
 */
export const watchCurvePoolSetNewMaTimeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: curvePoolAbi,
    address: curvePoolAddress,
    eventName: 'SetNewMATime',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link uniswapV2PoolAbi}__
 */
export const readUniswapV2Pool = /*#__PURE__*/ createReadContract({
  abi: uniswapV2PoolAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link uniswapV2PoolAbi}__ and `functionName` set to `"getReserves"`
 */
export const readUniswapV2PoolGetReserves = /*#__PURE__*/ createReadContract({
  abi: uniswapV2PoolAbi,
  functionName: 'getReserves',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link uniswapV2PoolAbi}__ and `functionName` set to `"token0"`
 */
export const readUniswapV2PoolToken0 = /*#__PURE__*/ createReadContract({
  abi: uniswapV2PoolAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link uniswapV2PoolAbi}__ and `functionName` set to `"token1"`
 */
export const readUniswapV2PoolToken1 = /*#__PURE__*/ createReadContract({
  abi: uniswapV2PoolAbi,
  functionName: 'token1',
})

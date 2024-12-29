-- Create the reserves table
CREATE TABLE IF NOT EXISTS pool_reserves (
    time TIMESTAMPTZ NOT NULL,
    pool_address TEXT NOT NULL,
    token0_reserves NUMERIC NOT NULL,
    token1_reserves NUMERIC NOT NULL,
    block_number BIGINT NOT NULL,
    virtual_price NUMERIC -- NULL for Uniswap pools
);

-- Convert to TimescaleDB hypertable
SELECT create_hypertable('pool_reserves', 'time');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pool_reserves_pool_address ON pool_reserves (pool_address);
CREATE INDEX IF NOT EXISTS idx_pool_reserves_block_number ON pool_reserves (block_number); 
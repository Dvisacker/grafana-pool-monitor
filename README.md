# Pool Monitor

A service that monitors Uniswap/Curve pool reserves and displays historical data in Grafana dashboards.

## Configuration

Configure the following environment variables:
- `RPC_URL`: Ethereum RPC endpoint
- `POOL_ADDRESS`: Address of the pool to monitor
- `DB_CONNECTION`: TimescaleDB connection string
- `POLLING_INTERVAL`: How often to fetch pool data (in milliseconds) 
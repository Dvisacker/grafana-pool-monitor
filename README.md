# Pool Monitor

A service that monitors Uniswap/Curve pool reserves and displays historical data in Grafana dashboards.

Useful for monitoring pool health and depegs.

## Prerequisites

- Node.js (v16 or higher)
- TimescaleDB
- Grafana
- Ethereum RPC endpoint
- Docker

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up TimescaleDB:
```bash
# Create the database
createdb pool_monitor

# Enable TimescaleDB extension (in psql)
psql -d pool_monitor -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"
```

4. Run migrations:
```bash
npm run migrate
```

5. Start the service:
```bash
npm run start
```

## Architecture

- Viem (with wagmi typings) for blockchain interactions
- TimescaleDB for time-series data storage
- Grafana for visualization

## Configuration

Configure the following environment variables:
- `RPC_URL`: Ethereum RPC endpoint
- `POOL_ADDRESS`: Address of the pool to monitor
- `DB_CONNECTION`: TimescaleDB connection string
- `POLLING_INTERVAL`: How often to fetch pool data (in milliseconds) 
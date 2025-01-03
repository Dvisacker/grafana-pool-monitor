-- CreateTable
CREATE TABLE "tokens" (
    "address" TEXT NOT NULL,
    "network_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("address","network_id")
);

-- CreateTable
CREATE TABLE "pools" (
    "pool_address" TEXT NOT NULL,
    "network_id" INTEGER NOT NULL,
    "pool_type" TEXT NOT NULL,
    "token0" TEXT NOT NULL,
    "token1" TEXT NOT NULL,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("pool_address","network_id")
);

-- CreateIndex
CREATE INDEX "tokens_address_idx" ON "tokens"("address");

-- CreateIndex
CREATE INDEX "tokens_network_id_idx" ON "tokens"("network_id");

-- CreateIndex
CREATE INDEX "pools_pool_address_idx" ON "pools"("pool_address");

-- CreateIndex
CREATE INDEX "pools_network_id_idx" ON "pools"("network_id");

-- CreateTable
CREATE TABLE "pool_reserves" (
    "time" TIMESTAMPTZ(6) NOT NULL,
    "block_number" INTEGER NOT NULL,
    "network_id" INTEGER NOT NULL,
    "pool_address" TEXT NOT NULL,
    "token0_reserves" TEXT NOT NULL,
    "token1_reserves" TEXT NOT NULL,

    CONSTRAINT "pool_reserves_pkey" PRIMARY KEY ("block_number","network_id","pool_address")
);

-- CreateTable
CREATE TABLE "dated_blocks" (
    "block_number" INTEGER NOT NULL,
    "network_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dated_blocks_pkey" PRIMARY KEY ("block_number","network_id")
);

-- CreateIndex
CREATE INDEX "pool_reserves_time_idx" ON "pool_reserves"("time" DESC);

-- CreateIndex
CREATE INDEX "pool_reserves_block_number_idx" ON "pool_reserves"("block_number");

-- CreateIndex
CREATE INDEX "pool_reserves_network_id_idx" ON "pool_reserves"("network_id");

-- CreateIndex
CREATE INDEX "pool_reserves_pool_address_idx" ON "pool_reserves"("pool_address");

-- CreateIndex
CREATE INDEX "dated_blocks_block_number_idx" ON "dated_blocks"("block_number");

-- CreateIndex
CREATE INDEX "dated_blocks_date_idx" ON "dated_blocks"("date");

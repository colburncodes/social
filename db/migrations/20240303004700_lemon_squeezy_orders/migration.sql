-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasLifeTimeAccess" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "LemonSqueezyOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "LemonSqueezyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezyOrder_orderId_key" ON "LemonSqueezyOrder"("orderId");

-- AddForeignKey
ALTER TABLE "LemonSqueezyOrder" ADD CONSTRAINT "LemonSqueezyOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0;

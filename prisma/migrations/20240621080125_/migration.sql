/*
  Warnings:

  - A unique constraint covering the columns `[coupon]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coupon` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "coupon" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_coupon_key" ON "Coupon"("coupon");

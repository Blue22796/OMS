-- CreateTable
CREATE TABLE "CouponApplied" (
    "orderId" INTEGER NOT NULL,
    "coupon" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponApplied_orderId_coupon_key" ON "CouponApplied"("orderId", "coupon");

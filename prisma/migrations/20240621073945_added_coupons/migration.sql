-- CreateTable
CREATE TABLE "Coupon" (
    "couponId" SERIAL NOT NULL,
    "off" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("couponId")
);

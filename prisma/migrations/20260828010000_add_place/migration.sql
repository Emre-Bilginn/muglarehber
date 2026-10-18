-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('BEACH', 'BAY', 'NATURE', 'HISTORICAL', 'VIEWPOINT', 'TOWN', 'ACTIVITY', 'OTHER');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "heroImage" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "address" TEXT,
    "districtId" TEXT,
    "placeType" "PlaceType" NOT NULL DEFAULT 'OTHER',
    "visitDuration" TEXT,
    "bestVisitTime" TEXT,
    "parkingInfo" TEXT,
    "accessInfo" TEXT,
    "accessibilityInfo" TEXT,
    "googleMapsUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");
CREATE INDEX "Place_districtId_idx" ON "Place"("districtId");
CREATE INDEX "Place_isPublished_idx" ON "Place"("isPublished");
CREATE INDEX "Place_placeType_idx" ON "Place"("placeType");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

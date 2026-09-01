-- CreateTable
CREATE TABLE "scores" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "imageId" INTEGER,
    "name" TEXT NOT NULL DEFAULT 'Anonymous',
    "startTime" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMPTZ(6),
    "finalTime" DECIMAL(65,30),

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scores_public_id_key" ON "scores"("public_id");

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

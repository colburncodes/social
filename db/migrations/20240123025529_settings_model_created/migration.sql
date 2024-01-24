-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "settingsEmailMarketing" BOOLEAN NOT NULL DEFAULT false,
    "settingsEmailProduct" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

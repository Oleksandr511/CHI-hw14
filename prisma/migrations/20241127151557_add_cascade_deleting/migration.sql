-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_exhibitId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exhibits" DROP CONSTRAINT "Exhibits_userId_fkey";

-- AddForeignKey
ALTER TABLE "Exhibits" ADD CONSTRAINT "Exhibits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_exhibitId_fkey" FOREIGN KEY ("exhibitId") REFERENCES "Exhibits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

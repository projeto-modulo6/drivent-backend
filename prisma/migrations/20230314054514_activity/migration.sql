-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "local_id" INTEGER NOT NULL,
    "date_id" INTEGER NOT NULL,
    "begin" TIMESTAMP(6) WITH TIME ZONE NOT NULL,
    "end" TIMESTAMP(6) WITH TIME ZONE NOT NULL,
    "seats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "date_activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "date_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_activity" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_date_activity_id_fkey" FOREIGN KEY ("date_id") REFERENCES "date_activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

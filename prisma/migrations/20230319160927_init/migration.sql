-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "announcement_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updated_date" INTEGER NOT NULL,
    "uploaded_date" INTEGER NOT NULL,
    "departmentsDepartment_id" TEXT,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("announcement_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" TEXT NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "created_date" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "departmentsDepartment_id" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "attendance" INTEGER NOT NULL,
    "batch" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "nus_email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "personal_email" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "total_events" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_departmentsDepartment_id_fkey" FOREIGN KEY ("departmentsDepartment_id") REFERENCES "Departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_departmentsDepartment_id_fkey" FOREIGN KEY ("departmentsDepartment_id") REFERENCES "Departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     data: {
    //       attendance: 2,
    //       batch: "22/23",
    //       department: "Blockchain",
    //       discord: "abc",
    //       gender: "male",
    //       faculty: "SOC",
    //       hobbies: "badminton",
    //       level: "1",
    //       image: "https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    //       name: "Jon",
    //       nus_email: "test@u.nus.edu",
    //       personal_email: "test@hmail.com",
    //       projects: "DAO",
    //       roles: "Software Developer",
    //       student_id: "1",
    //       telegram: "@Jonthelegend",
    //       total_events: "1",
    //       wallet: "50",
    //       year: "1"
    //     }
    // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
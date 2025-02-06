import prisma from "../src/db"

async function seedUsers() {
  try {
    await prisma.user.upsert({
      where: { email: "example@gmail.com" },
      update: { email: "example@gmail.com" },
      create: {
        email: "example@gmail.com",
        password: "1234",
        name: "example",
      },
    })
  } catch (error) {
    console.error("Error seeding users: ", error)
    throw error
  }
}

async function seedDatabase() {
  try {
    await seedUsers()
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  } finally {
    prisma.$disconnect()
  }
}

seedDatabase().catch((error) => {
  console.error("An unexpected error occurred during seeding:", error)
  process.exit(1)
})

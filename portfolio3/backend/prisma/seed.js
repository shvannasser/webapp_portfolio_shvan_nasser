import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));
  console.log("Start seeding...");

  // Seed Projects with Author Association and Tags/Collaborators
  for (const project of data.projects) {
    // Create or update each project
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        id: project.id,
        title: project.title,
        image: project.image,
        description: project.description,
        isPublic: project.isPublic,
        publishedAt: new Date(project.publishedAt),
        createdAt: new Date(project.createdAt),
        status: project.status,
        // authorId: project.authorId,
      },
    });

    // // Seed Users
    // for (const user of data.users) {
    //   await prisma.user.upsert({
    //     where: { id: user.id },
    //     update: {},
    //     create: {
    //       id: user.id,
    //       name: user.name,
    //     },
    //   });
    // }

    // // Seed Tags
    // for (const tag of data.tags) {
    //   await prisma.projectTag.upsert({
    //     where: { id: tag.id },
    //     update: {},
    //     create: {
    //       id: tag.id,
    //       name: tag.name,
    //     },
    //   });
    // }

    // // Link tags to the current project
    // for (const tag of project.tags) {
    //   await prisma.project.update({
    //     where: { id: project.id },
    //     data: {
    //       tags: {
    //         connect: { id: tag.tagId }, // Connect tag by tagId
    //       },
    //     },
    //   });
    // }

    // // Link collaborators to the current project
    // for (const collaborator of project.collaborators) {
    //   await prisma.projectCollaborator.create({
    //     data: {
    //       createdAt: new Date(collaborator.createdAt),
    //       user: { connect: { id: collaborator.userId } },
    //       project: { connect: { id: project.id } },
    //     },
    //   });
    // }
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

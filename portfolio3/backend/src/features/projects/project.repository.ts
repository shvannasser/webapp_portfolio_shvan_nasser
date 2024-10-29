import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async () => {
  try {
    return await prisma.project.findMany();
  } catch (error) {
    console.error("Error retrieving projects:", error);
    throw error;
  }
};

export const createProject = async (projectData: any) => {
  try {
    const publishedAt = projectData.isPublic ? new Date() : null;
    return await prisma.project.create({
      data: {
        title: projectData.title,
        isPublic: projectData.isPublic,
        status: projectData.status,
        publishedAt: publishedAt,
        image: projectData.image,
        description: projectData.description,
      },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: any) => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      throw new Error("Project not found");
    }

    const isPublicChanged = !existingProject.isPublic && projectData.isPublic;
    const publishedAt = isPublicChanged
      ? new Date()
      : existingProject.publishedAt;

    return await prisma.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        publishedAt: publishedAt,
      },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    return await prisma.project.delete({
      where: { id: projectId },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

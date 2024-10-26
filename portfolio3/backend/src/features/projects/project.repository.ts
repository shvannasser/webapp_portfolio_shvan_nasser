import { PrismaClient, Project as PrismaProject } from "@prisma/client";
import type { Project, CreateProject, UpdateProject } from "./project.schema";
import { fromDb, toDb } from "./project.mapper";
import { Result } from "../../../types";
import { Query } from "../../lib/query";

const prisma = new PrismaClient();

export const createProjectRepository = () => {
  const exist = async (id: string): Promise<boolean> => {
    const count = await prisma.project.count({
      where: { id },
    });

    return count > 0;
  };

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      }
      const project = await prisma.project.findUnique({
        where: { id },
      });
      return {
        success: true,
        data: fromDb(project as PrismaProject),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching project",
        },
      };
    }
  };

  const list = async (params?: Query): Promise<Result<Project[]>> => {
    try {
      const { title, pageSize = 10, page = 0 } = params ?? {};
      const offset = (Number(page) - 1) * Number(pageSize);
      const hasPagination = Number(page) > 0;
      const projects = await prisma.project.findMany({
        where: title ? { title: { contains: title } } : {},
        take: Number(pageSize),
        skip: offset,
      });

      const total = await prisma.project.count();
      const totalPages = Math.ceil(total / Number(pageSize));
      const hasNextPage = Number(page) < totalPages;
      const hasPreviousPage = Number(page) > 1;

      return {
        success: true,
        data: projects.map(fromDb),
        ...(hasPagination
          ? {
              total,
              pageSize,
              page,
              totalPages,
              hasNextPage,
              hasPreviousPage,
            }
          : {}),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching projects",
        },
      };
    }
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    try {
      const projectData = toDb(data);
      const transformedProjectData = {
        ...projectData,
        tags: {
          create: data.tags.map((tag) => ({ name: tag })),
        },
        collaborators: {
          create: data.collaborators.map((collaborator) => ({
            name: collaborator,
            user: { connect: { id: collaborator } },
          })),
        },
      };

      const newProject = await prisma.project.create({
        data: transformedProjectData,
      });

      return {
        success: true,
        data: newProject.id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating project",
        },
      };
    }
  };

  const update = async (data: UpdateProject): Promise<Result<Project>> => {
    try {
      const projectExists = await exist(data.id);
      if (!projectExists) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      }
      const projectData = toDb(data);
      const updatedProject = await prisma.project.update({
        where: { id: data.id },
        data: projectData,
      });
      return {
        success: true,
        data: fromDb(updatedProject as PrismaProject),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating project",
        },
      };
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      }
      await prisma.project.delete({
        where: { id },
      });
      return {
        success: true,
        data: id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting project",
        },
      };
    }
  };

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository();

export type ProjectRepository = ReturnType<typeof createProjectRepository>;

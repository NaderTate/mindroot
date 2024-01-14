"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/user";
import { projectSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { itemsPerPage } from "@/globals";

export const getProjects = async (page = 1, search = "") => {
  const user = await currentUser();

  const count = await prisma.project.count({
    where: {
      userId: user?.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  const projects = await prisma.project.findMany({
    where: {
      userId: user?.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (page - 1) * itemsPerPage,
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  return { projects, count };
};

export const createProject = async (values: z.infer<typeof projectSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = projectSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, categories, deadline } = validatedFields.data;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        deadline,
        userId: user.id,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
        // teams: {
        //   connect: teams.map((id) => ({ id })),
        // },
      },
    });
    if (!project) {
      return { error: "Error creating project" };
    }
    revalidatePath("/projects");
    return { success: "Project created!" };
  } catch (error) {
    return { error: "Error creating project" };
  }
};

export const deleteProject = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    revalidatePath("/projects");
    return { success: "Project deleted!" };
  } catch (error) {
    return { error: "Error deleting project" };
  }
};

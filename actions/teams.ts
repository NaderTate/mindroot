"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { itemsPerPage } from "@/globals";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/user";
import { teamSchema } from "@/schemas";
import { Prisma } from "@prisma/client";

export const getTeams = async ({
  getAll = false,
  page = 1,
  search = "",
  select = {},
}: {
  getAll?: boolean;
  page?: number;
  search?: string;
  select?: Prisma.TeamSelect;
}) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const count = await prisma.team.count({
    where: {
      AND: [
        { name: { contains: search, mode: "insensitive" } },
        { leaderId: user.id },
      ],
    },
  });

  const teams = await prisma.team.findMany({
    where: {
      AND: [
        { name: { contains: search, mode: "insensitive" } },
        { leaderId: user.id },
      ],
    },
    select,
    skip: getAll ? 0 : (page - 1) * itemsPerPage,
    take: getAll ? count : itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
  return { teams, count };
};

export const createTeam = async (values: z.infer<typeof teamSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = teamSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name } = validatedFields.data;
  try {
    const team = await prisma.team.create({
      data: {
        name,
        leaderId: user.id,
      },
    });
    if (!team) {
      return { error: "Error creating category" };
    }
    revalidatePath("/categories");
    return { success: "Category created!" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating category" };
  }
};

export const deleteTeam = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  try {
    await prisma.team.delete({
      where: {
        id,
      },
    });
    revalidatePath("/categories");
    return { success: "Category deleted!" };
  } catch (error) {
    console.log(error);
    return { error: "Error deleting category" };
  }
};

"use server";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/user";
import { categorySchema } from "@/schemas";
import { itemsPerPage } from "@/globals";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getCategories = async ({
  page = 1,
  search = "",
  getAll = false,
  select = {},
}: {
  page?: number;
  search?: string;
  getAll?: boolean;
  select?: Prisma.CategorySelect;
}) => {
  const user = await currentUser();

  const count = await prisma.category.count({
    where: {
      userId: user?.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      userId: user?.id,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select,
    skip: getAll ? 0 : (page - 1) * itemsPerPage,
    take: getAll ? count : itemsPerPage,
    orderBy: { createdAt: "desc" },
  });
  return { categories, count };
};

export const createCategory = async (
  values: z.infer<typeof categorySchema>
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = categorySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name } = validatedFields.data;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        userId: user.id,
      },
    });
    if (!category) {
      return { error: "Error creating category" };
    }
    revalidatePath("/categories");
    return { success: "Category created!" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating category" };
  }
};

export const updateCategory = async (
  id: string,
  values: z.infer<typeof categorySchema>
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = categorySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name } = validatedFields.data;
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    if (!category) {
      return { error: "Error updating category" };
    }
    revalidatePath("/categories");

    return { success: "Category updated!" };
  } catch (error) {
    console.log(error);
    return { error: "Error updating category" };
  }
};

export const deleteCategory = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });
    return { success: "Category deleted!" };
  } catch (error) {
    return { error: "Error deleting category" };
  }
};

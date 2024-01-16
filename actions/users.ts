"use server";
import { prisma } from "@/lib/prisma";

export const findUser = async ({
  keywords,
  limit = 10,
}: {
  keywords: string;
  limit?: number;
}) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keywords,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: keywords,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      take: limit,
    });
    return { users };
  } catch (error) {
    return { error };
  }
};

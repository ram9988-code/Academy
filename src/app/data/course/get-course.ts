import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function getCourse(slug: string) {
  const data = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      title: true,
      description: true,
      smallDescription: true,
      price: true,
      slug: true,
      fileKey: true,
      id: true,
      level: true,
      duration: true,
      category: true,
      updatedAt: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lesson: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export type UserIndividualCourseType = Awaited<ReturnType<typeof getCourse>>;

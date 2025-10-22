import prisma from "@/lib/db";

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    orderBy: {
      createdAt: "desc",
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
    },
  });
  return data;
}

export type UserCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];

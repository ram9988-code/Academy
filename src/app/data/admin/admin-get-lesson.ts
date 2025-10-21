import "server-only";
import { requireAdmin } from "./require-admin";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetLesson({ id }: { id: string }) {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      videoKey: true,
      thumbnailKay: true,
      description: true,
      id: true,
      position: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminGetLessonType = Awaited<ReturnType<typeof adminGetLesson>>;

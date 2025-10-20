import { z } from "zod";

export const courseCategory = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "Language Learning",
] as const;

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  level: z.enum(
    courseLevels,
    "Level must be one of: Beginner, Intermediate, Advanced"
  ),

  fileKey: z.string().min(1, "File key is required"),
  price: z.number().min(1, "Price must be positive"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  category: z.enum(courseCategory, "Category is required"),
  smallDescription: z
    .string()
    .min(3, "Small description must be at least 3 characters long")
    .max(200, "Small description must be at most 200 characters long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(100, "Slug must be at most 100 characters long"),
  status: z.enum(
    courseStatus,
    "Status must be one of: Draft, Published, Archived"
  ),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  courseId: z.string().uuid({ message: "Invalid couse id" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  courseId: z.string().uuid({ message: "Invalid course Id" }),
  chapterId: z.string().uuid({ message: "Invailid chapter Id" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." })
    .optional(),
  thumbnailKay: z.string().optional(),
  videoKey: z.string().optional(),
});

export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;

import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "./[lessonId]/_components/lesson-form";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

async function ChapterEditPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson({ id: lessonId });

  return (
    <div>
      <LessonForm data={lesson} chapterId={chapterId} />
    </div>
  );
}

export default ChapterEditPage;

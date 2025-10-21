import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "./_components/lesson-form";
import { LessonIdEditBreadcrumb } from "./_components/lesson-id-breadcrumb";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

async function LessonIdPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson({ id: lessonId });

  return (
    <div>
      <LessonIdEditBreadcrumb
        chapterId={chapterId}
        courseId={courseId}
        lessonId={lesson.title}
      />
      <LessonForm data={lesson} chapterId={chapterId} lessonId={lessonId} />
    </div>
  );
}

export default LessonIdPage;

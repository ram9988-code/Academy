import React, { Suspense } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import EmptyState from "@/components/general/empty-state";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./_component/admin-course-card";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";

function CourseAdminPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href={"/admin/courses/create"} className={buttonVariants()}>
          Create New Course
        </Link>
      </div>
      <div>
        <h1>Here you will see all of the courses</h1>
      </div>
      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderContent />
      </Suspense>
    </>
  );
}

async function RenderContent() {
  const data = await adminGetCourses();

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Create a new course to get started"
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {data.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}

function AdminCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default CourseAdminPage;

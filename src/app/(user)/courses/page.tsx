import { getAllCourses } from "@/app/data/course/get-all-courses";
import React, { Suspense } from "react";
import UserCourseCard, {
  UserCouresCardSkeleton,
} from "./_components/user-course-card";

function CoursesPage() {
  return (
    <div className="mt-10">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <UserCourseCard key={course.id} {...course} />
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <UserCouresCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default CoursesPage;

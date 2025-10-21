"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import React, { useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { deleteCourse } from "./action";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, Trash2 } from "lucide-react";

function DeleteCousePage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();

  function onSubmit() {
    // console.log(values);
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error(
          "An error occurred while creating course. Please try again."
        );
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className=" max-w-2xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>This action can not be un done.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            href={`/admin/courses`}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button onClick={onSubmit} disabled={pending}>
            {pending ? (
              <>
                <Loader2 className={"size-4 animate-spin"} />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default DeleteCousePage;

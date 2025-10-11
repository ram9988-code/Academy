"use client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./render-state";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";

interface UploaderProps {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleteing: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image";
}

interface FileUploaderProps {
  value?: string;
  onChange?: (url: string) => void;
}

function FileUploader({ onChange, value }: FileUploaderProps) {
  const fileUrl = useConstructUrl(value || "");

  const [fileState, setFileState] = useState<UploaderProps>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    isDeleteing: false,
    progress: 0,
    uploading: false,
    objectUrl: fileUrl,
    key: value,
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      //GET PRESIGNED URL FROM THE SERVER
      const presignedUrl = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedUrl.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }

      const { preSignedURL, key } = await presignedUrl.json();

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(progress),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key,
            }));
            onChange?.(key);
            toast.success("File uploaded successfully");
            resolve(true);
          } else {
            console.error("S3 upload error:", xhr.status, xhr.responseText);
            reject(new Error("Upload failed"));
          }
        };
        xhr.onerror = (err) => reject(new Error(`Upload failed: ${err}`));
        xhr.open("PUT", preSignedURL, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      // console.error("Upload error:", error);
      toast.error("Failed to upload file");

      setFileState((prev) => ({
        ...prev,
        progress: 0,
        uploading: false,
        error: true,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState((prev) => ({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleteing: false,
          fileType: "image",
        }));
        uploadFile(file);
      }
    },
    [fileState.objectUrl]
  );

  async function handleRemoveFile() {
    if (fileState.isDeleteing || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleteing: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: fileState.key }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file");
        setFileState((prev) => ({
          ...prev,
          isDeleteing: false,
          error: true,
        }));
        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState((prev) => ({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        id: null,
        isDeleteing: false,
        fileType: "image",
      }));

      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to delete file");
      setFileState((prev) => ({
        ...prev,
        isDeleteing: false,
        error: true,
      }));
    }
  }

  function rejectedFile(fileRejections: FileRejection[]) {
    if (fileRejections && fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find((rejection) =>
        rejection.errors.some((error) => error.code === "too-many-files")
      );

      const fileTooLarge = fileRejections.find((rejection) =>
        rejection.errors.some((error) => error.code === "file-too-large")
      );
      if (fileTooLarge) {
        toast.error("File is too large. Max file size is 5MB.");
      }
      if (tooManyFiles) {
        toast.error("You can only upload one file at a time.");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file!}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (!fileState.file) {
      return <RenderEmptyState isDragActive={isDragActive} />;
    }
    return (
      <RenderUploadedState
        previewURL={fileState.objectUrl!}
        handleRemoveFile={handleRemoveFile}
        isDeleting={fileState.isDeleteing}
      />
    );
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: rejectedFile,
    disabled: fileState.uploading || fileState.isDeleteing,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-100",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center h-full w-full">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}

export default FileUploader;

"use client";
import React, { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import TextAlign from "@tiptap/extension-text-align";
import { generateHTML, type JSONContent } from "@tiptap/react";

function RenderDescription({ json }: { json: JSONContent }) {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ]);
  }, [json]);
  return (
    <div className="prose data:prose-invert prose-li:marker:text-primary">
      {parse(output)}
    </div>
  );
}

export default RenderDescription;

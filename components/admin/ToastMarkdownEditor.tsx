"use client";

import { useEffect, useRef } from "react";
import { Editor as ToastEditor } from "@toast-ui/react-editor";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function ToastMarkdownEditor({ value, onChange }: Props) {
  const editorRef = useRef<ToastEditor | null>(null);

  useEffect(() => {
    import("@toast-ui/editor/dist/toastui-editor.css");
  }, []);

  return (
    <div className="border-2 border-black dark:border-white">
      <ToastEditor
        ref={editorRef}
        initialValue={value}
        previewStyle="vertical"
        height="700px"
        initialEditType="markdown"
        useCommandShortcut
        onChange={() => {
          const editorInstance = editorRef.current?.getInstance();
          if (editorInstance) {
            onChange(editorInstance.getMarkdown());
          }
        }}
      />
    </div>
  );
}

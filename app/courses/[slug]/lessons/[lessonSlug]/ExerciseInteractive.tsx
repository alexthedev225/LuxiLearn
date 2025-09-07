"use client";

import { useState, useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export type ValidationResult =
  | true
  | string
  | { success: boolean; message?: string };

export interface ExerciseInteractiveProps {
  prompt: string;
  solution: string;
  title: string;
  validateCode?: (args: { code: string }) => ValidationResult;
  onValidateSuccess?: () => void;
}
// Déclarer monaco sur window pour TypeScript
declare global {
  interface Window {
    monaco?: typeof import("monaco-editor");
  }
}

export default function ExerciseInteractive({
  prompt,
  solution,
  title,
  onValidateSuccess,
  validateCode,
}: ExerciseInteractiveProps) {
  const [code, setCode] = useState<string>(prompt);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [decorations, setDecorations] = useState<string[]>([]);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const getTheme = (): "vs-dark" | "light" => {
    const isDarkTailwind = document.documentElement.classList.contains("dark");
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return isDarkTailwind || isSystemDark ? "vs-dark" : "light";
  };

  useEffect(() => {
    if (editorRef.current && window.monaco) {
      window.monaco.editor.setTheme(getTheme());
    }

    const observer = new MutationObserver(() => {
      if (editorRef.current && window.monaco) {
        window.monaco.editor.setTheme(getTheme());
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (editorRef.current && window.monaco) {
        window.monaco.editor.setTheme(getTheme());
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    setCode(prompt);
    setValidationMessage("");
    setValidationSuccess(false);
    setShowSolution(false);
  }, [prompt]);

  const normalizeCode = (code: string): string =>
    code.replace(/\s+/g, " ").trim().toLowerCase();

  const handleValidate = () => {
    if (!validateCode) {
      const normalizedUserCode = normalizeCode(code);
      const normalizedSolution = normalizeCode(solution);
      if (normalizedUserCode === normalizedSolution) {
        setValidationSuccess(true);
        setValidationMessage("✅ Correct");
        onValidateSuccess?.();
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ Incorrect");
      }
      return;
    }

    try {
      const result = validateCode({ code });

      if (result === true) {
        setValidationSuccess(true);
        setValidationMessage("✅ Correct");
        onValidateSuccess?.();
      } else if (typeof result === "string") {
        setValidationSuccess(false);
        setValidationMessage("❌ " + result);
      } else if (typeof result === "object") {
        if (result.success) {
          setValidationSuccess(true);
          setValidationMessage("✅ " + (result.message ?? "Correct"));
          onValidateSuccess?.();
        } else {
          setValidationSuccess(false);
          setValidationMessage("❌ " + (result.message ?? "Incorrect"));
        }
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ Incorrect");
      }
    } catch {
      setValidationSuccess(false);
      setValidationMessage("❌ Error");
    }
  };


  const handleReset = () => {
    setCode(prompt);
    setValidationMessage("");
    setValidationSuccess(false);
    setShowSolution(false);
  };

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monacoInstance.languages.typescript.JsxEmit.React,
      target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      esModuleInterop: true,
      moduleResolution:
        monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monacoInstance.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      strict: false,
    });

    monacoInstance.languages.typescript.javascriptDefaults.addExtraLib(
      `
      declare namespace React {
        interface Attributes {}
        interface ReactNode {}
        interface ReactElement {}
        function createElement(type: any, props?: any, ...children: any[]): any;
        const Fragment: any;
      }
      declare var React: typeof import("react");
      `,
      "file:///node_modules/@types/react/index.d.ts"
    );

monacoInstance.editor.setTheme(getTheme());
  };

  const findAllDiffLines = (starter: string, solution: string): number[] => {
    const starterLines = starter.split("\n");
    const solutionLines = solution.split("\n");
    const maxLines = Math.max(starterLines.length, solutionLines.length);
    const diffLines: number[] = [];
    for (let i = 0; i < maxLines; i++) {
      if (
        (starterLines[i]?.trim() ?? "") !== (solutionLines[i]?.trim() ?? "")
      ) {
        diffLines.push(i + 1);
      }
    }
    return diffLines;
  };

  const highlightSolutionLines = (lines: number[]): void => {
    const monacoInstance = window.monaco;
    if (!editorRef.current || !monacoInstance) return;

    const newDecorations = editorRef.current.deltaDecorations(decorations, [
      ...lines.map((lineNumber) => ({
        range: new monacoInstance.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "lineHighlight",
          linesDecorationsClassName: "lineHighlightDecoration",
        },
      })),
    ]);

    setDecorations(newDecorations);
  };

  useEffect(() => {
    if (showSolution) {
      highlightSolutionLines(findAllDiffLines(prompt, solution));
    } else if (editorRef.current) {
      editorRef.current.deltaDecorations(decorations, []);
      setDecorations([]);
    }
  }, [showSolution, prompt, solution]);

  return (
    <section className="mb-4">
      <div className="relative">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-black uppercase tracking-wide text-black dark:text-white">
            Exercice interactif
          </h2>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-black dark:text-white">
            {title}
          </p>

          <div className="relative group rounded border-2 border-neutral-400 dark:border-neutral-600 p-1 transition-all duration-200 hover:border-neutral-500">
            <MonacoEditor
              height="300px"
              defaultLanguage="javascript"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 13.5,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleValidate}
              className="flex-1 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              Valider
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-1 border border-yellow-500 text-yellow-600 font-semibold text-sm rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => setShowSolution((prev) => !prev)}
              className={`flex-1 px-3 py-1 rounded-lg font-semibold text-sm transition-colors ${
                showSolution
                  ? "bg-red-500 text-white shadow-md hover:shadow-lg"
                  : "bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              {showSolution ? "Cacher Solution" : "Voir Solution"}
            </button>
          </div>

          {validationMessage && (
            <div
              className={`pt-4 font-bold ${
                validationSuccess
                  ? "text-green-800 dark:text-green-400"
                  : "text-red-600"
              }`}
            >
              {validationMessage}
            </div>
          )}

          {showSolution && (
            <section className="mt-2 rounded border-2 border-neutral-400 dark:border-neutral-600 p-2 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wide text-neutral-800 dark:text-white">
                Solution
              </h3>
              <div className="prose prose-invert max-w-none mb-6 sm:mb-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  children={`\`\`\`javascript\n${solution}\n\`\`\``}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

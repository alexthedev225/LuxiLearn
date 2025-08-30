"use client";

import { useState, useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type ValidationResult = true | string | { success: boolean; message?: string };

export default function ExerciseInteractive({
  prompt,
  solution,
  title,
  onValidateSuccess,
  validate,
}: {
  prompt: string;
  solution: string;
  title: string;
  validate?: (args: { code: string }) => ValidationResult;
  onValidateSuccess?: () => void;
}) {
  const [code, setCode] = useState(prompt);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [decorations, setDecorations] = useState<string[]>([]);
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === "dark" || resolvedTheme === "dark";
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    setCode(prompt);
    setValidationMessage("");
    setValidationSuccess(false);
    setShowSolution(false);
  }, [prompt]);

  const normalizeCode = (code: string): string =>
    code.replace(/\s+/g, " ").trim().toLowerCase();

  const handleValidate = () => {
    if (!validate) {
      const normalizedUserCode = normalizeCode(code);
      const normalizedSolution = normalizeCode(solution);

      if (normalizedUserCode === normalizedSolution) {
        setValidationSuccess(true);
        setValidationMessage("✅ CORRECT");
        setShowSolution(false);
        onValidateSuccess?.();
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ INCORRECT");
      }
      return;
    }

    try {
      const result = validate(code);

      if (
        result === true ||
        (result && typeof result === "object" && result.success)
      ) {
        setValidationSuccess(true);
        setValidationMessage("✅ CORRECT");
        setShowSolution(false);
        onValidateSuccess?.();
      } else if (typeof result === "string") {
        setValidationSuccess(false);
        setValidationMessage("❌ " + result);
      } else if (result && typeof result === "object" && !result.success) {
        setValidationSuccess(false);
        setValidationMessage("❌ " + (result.message || "INCORRECT"));
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ INCORRECT");
      }
    } catch (error) {
      setValidationSuccess(false);
      setValidationMessage("❌ ERREUR");
      console.error(error);
    }
  };

  const handleReset = () => {
    setCode(prompt);
    setValidationMessage("");
    setValidationSuccess(false);
    setShowSolution(false);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      esModuleInterop: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      strict: false,
    });

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
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
  };

  function findAllDiffLines(starter: string, solution: string): number[] {
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
  }

  const highlightSolutionLines = (lines: number[]) => {
    if (!editorRef.current) return;
    const monaco = (
      window as Window & { monaco?: typeof import("monaco-editor") }
    ).monaco;
    if (!monaco) return;

    const newDecorations = editorRef.current.deltaDecorations(decorations, [
      ...lines.map((lineNumber) => ({
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
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
      const linesToHighlight = findAllDiffLines(prompt, solution);
      highlightSolutionLines(linesToHighlight);
    } else if (editorRef.current) {
      editorRef.current.deltaDecorations(decorations, []);
      setDecorations([]);
    }
  }, [showSolution, prompt, solution]);

  return (
    <section className="mb-8 bg-white dark:bg-black">
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-red-600" />
          <h2 className="text-2xl font-black uppercase tracking-wide text-black dark:text-white">
            EXERCICE INTERACTIF
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-base font-bold text-black dark:text-white">
            {title}
          </p>

          <div className="relative group border-2 border-black dark:border-white p-1.5 transition-all duration-200 hover:border-red-600">
            <MonacoEditor
              height="240px"
              defaultLanguage="javascript"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              onMount={handleEditorDidMount}
              theme={isDark ? "vs-dark" : "vs"}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                wordWrap: "on",
                automaticLayout: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                acceptSuggestionOnCommitCharacter: true,
                acceptSuggestionOnEnter: "on",
                autoClosingBrackets: "always",
                autoClosingQuotes: "always",
                tabCompletion: "on",
                formatOnType: true,
                formatOnPaste: true,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleValidate}
              className="px-3 py-1.5 bg-red-600 text-white font-bold text-sm border-2 border-black dark:border-white transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:border-red-600"
            >
              Valider
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 border-2 border-black dark:border-white bg-transparent font-bold text-sm text-black dark:text-white transition-all duration-200 hover:text-red-600 hover:border-red-600 hover:translate-x-1 hover:translate-y-1"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => setShowSolution((prev) => !prev)}
              className={`px-3 py-1.5 border-2 font-bold text-sm transition-all duration-200 hover:border-red-600 hover:translate-x-1 hover:translate-y-1 ${showSolution ? "bg-red-600 text-white border-black dark:border-white" : "bg-transparent text-black dark:text-white border-black dark:border-white"}`}
            >
              {showSolution ? "Cacher Solution" : "Voir Solution"}
            </button>
          </div>

          {validationMessage && (
            <div
              className={`p-2 border-l-4 border-red-600 font-bold text-sm ${
                validationSuccess
                  ? "text-black dark:text-white"
                  : "text-red-600"
              }`}
            >
              {validationMessage}
            </div>
          )}

          {showSolution && (
            <section className="mt-4 border-2 border-black dark:border-white p-2 space-y-2">
              <h3 className="text-lg font-black uppercase tracking-wide text-red-600">
                SOLUTION
              </h3>
              <div className="prose max-w-none text-black dark:text-white prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-li:text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  children={"```javascript\n" + solution + "\n```"}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

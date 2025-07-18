"use client";

import { useState, useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
type ValidationResult = true | string | { success: boolean; message?: string };

export default function ExerciseInteractive({
  starterCode,
  solutionCode,
  description,
  onValidateSuccess, // 👈 AJOUTE CETTE LIGNE
  // tu peux garder validate en option locale si tu veux fallback
  validate,
}: {
  starterCode: string;
  solutionCode: string;
  description: string;
  validate?: (args: { code: string }) => ValidationResult;
  onValidateSuccess?: () => void; // 👈 ajoute ça
}) {
  const [code, setCode] = useState(starterCode);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [decorations, setDecorations] = useState<string[]>([]);
  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === "dark" || resolvedTheme === "dark";

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    setCode(starterCode);
    setValidationMessage("");
    setValidationSuccess(false);
    setShowSolution(false);
  }, [starterCode]);

  const normalizeCode = (code: string): string =>
    code.replace(/\s+/g, " ").trim().toLowerCase();

  const handleValidate = () => {
    if (!validate) {
      // Validation simple si pas de validate fourni
      const normalizedUserCode = normalizeCode(code);
      const normalizedSolution = normalizeCode(solutionCode);

      if (normalizedUserCode === normalizedSolution) {
        setValidationSuccess(true);
        setValidationMessage("✅ Bravo ! Votre solution est correcte 🎉");
        setShowSolution(false);
        onValidateSuccess?.(); // 👈 AJOUTE CETTE LIGNE
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ Solution incorrecte. Essayez encore !");
      }
      return;
    }

    try {
      const result = validate({ code });

      if (
        result === true ||
        (result && typeof result === "object" && result.success)
      ) {
        setValidationSuccess(true);
        setValidationMessage("✅ Bravo ! Votre solution est correcte 🎉");
        setShowSolution(false);
        onValidateSuccess?.(); // 👈 AJOUTE CETTE LIGNE
      } else if (typeof result === "string") {
        setValidationSuccess(false);
        setValidationMessage("❌ " + result);
      } else if (result && typeof result === "object" && !result.success) {
        setValidationSuccess(false);
        setValidationMessage(
          "❌ " + (result.message || "Solution incorrecte.")
        );
      } else {
        setValidationSuccess(false);
        setValidationMessage("❌ Solution incorrecte. Essayez encore !");
      }
    } catch (error) {
      setValidationSuccess(false);
      setValidationMessage("❌ Une erreur est survenue pendant la validation.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
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
      const starterLine = starterLines[i]?.trim() ?? "";
      const solutionLine = solutionLines[i]?.trim() ?? "";
      if (starterLine !== solutionLine) {
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
      const linesToHighlight = findAllDiffLines(starterCode, solutionCode);
      highlightSolutionLines(linesToHighlight);
    } else {
      if (editorRef.current) {
        editorRef.current.deltaDecorations(decorations, []);
        setDecorations([]);
      }
    }
  }, [showSolution, starterCode, solutionCode]);

  return (
    <section className="max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Exercice</h2>
      <Card className="bg-content1 dark:bg-content1-dark border border-border rounded-xl">
        <CardBody className="p-6">
          <p className="text-foreground/95 dark:text-foreground-dark/95 mb-4">
            {description}
          </p>

          <MonacoEditor
            height="300px"
            defaultLanguage="javascript"
            language="javascript"
            path="file.jsx"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            onMount={handleEditorDidMount}
            theme={isDark ? "vs-dark" : "vs"}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              suggestOnTriggerCharacters: true,
              quickSuggestions: { other: true, comments: true, strings: true },
              acceptSuggestionOnCommitCharacter: true,
              acceptSuggestionOnEnter: "on",
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              tabCompletion: "on",
              formatOnType: true,
              formatOnPaste: true,
            }}
          />

          <div className="flex flex-wrap gap-3 mt-4 mb-4">
            <Button
              onClick={handleValidate}
              variant="solid"
              className="min-w-[130px]"
            >
              Tester / Valider ✅
            </Button>

            <Button
              onClick={handleReset}
              variant="faded"
              className="min-w-[130px]"
            >
              Réinitialiser ↻
            </Button>

            <Button
              onClick={() => setShowSolution((prev) => !prev)}
              variant="light"
              className="min-w-[130px] bg-gray-200 dark:bg-gray-700 hover:bg-transparent transition-colors"
              aria-expanded={showSolution}
              aria-controls="solution-section"
            >
              {showSolution
                ? "Cacher la solution 👁️‍🗨️"
                : "Afficher la solution 👁️"}
            </Button>
          </div>

          {validationMessage && (
            <p
              className={`font-semibold ${
                validationSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {validationMessage}
            </p>
          )}

          {showSolution && (
            <section className="mt-4">
              <h3 className="text-red-600 dark:text-red-500 font-semibold mb-2">
                Solution
              </h3>
              <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md prose dark:prose-invert max-w-none overflow-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  children={"```javascript\n" + solutionCode + "\n```"}
                />
              </div>
            </section>
          )}
        </CardBody>
      </Card>

      <style jsx global>{`
        .lineHighlight {
          background-color: rgba(255, 215, 0, 0.3);
        }
        .lineHighlightDecoration {
          border-left: 4px solid gold;
        }
        .monaco-editor.readonly .view-lines {
          opacity: 1 !important;
          filter: none !important;
          user-select: text !important; /* autorise la sélection */
          color: inherit !important; /* assure couleur normale */
        }

        .monaco-editor.readonly .monaco-editor-background {
          background-color: transparent !important;
          opacity: 1 !important;
          filter: none !important;
        }

        .monaco-editor.readonly {
          opacity: 1 !important;
          filter: none !important;
          user-select: text !important;
        }
      `}</style>
    </section>
  );
}

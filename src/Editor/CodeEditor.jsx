import Editor from "@monaco-editor/react";
import { useRef, useEffect } from "react";

function CodeEditor({ setCode, code, currentStep, steps }) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationRef = useRef([]);

  // UPDATE: Access the line from the first frame in the frames array
  const lineToHighlight = steps?.[currentStep]?.frames?.[0]?.line;

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    // If there is no line to highlight, clear existing decorations and exit
    if (!lineToHighlight) {
      decorationRef.current = editorRef.current.deltaDecorations(
        decorationRef.current,
        [],
      );
      return;
    }

    // Apply the highlight to the current line
    decorationRef.current = editorRef.current.deltaDecorations(
      decorationRef.current,
      [
        {
          range: new monacoRef.current.Range(
            lineToHighlight,
            1,
            lineToHighlight,
            1,
          ),
          options: {
            isWholeLine: true,
            className: "executing-line", // Ensure this class is in your CSS
            glyphMarginClassName: "executing-line-glyph", // Optional: adds icon in the margin
          },
        },
      ],
    );

    // Optional: Auto-scroll the editor to the executing line
    editorRef.current.revealLineInCenter(lineToHighlight);
  }, [currentStep, lineToHighlight]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}

export default CodeEditor;

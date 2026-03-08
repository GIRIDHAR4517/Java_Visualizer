import Editor from "@monaco-editor/react";
import { useState } from "react";
import RunButton from "../Components/RunButton";
import { runJavaCode } from "../Services/api";

function CodeEditor({setCode , code}) {
 

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
}

export default CodeEditor;

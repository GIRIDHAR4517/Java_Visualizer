import CodeEditor from "./CodeEditor";
import StackVisualizer from "./StackVisualizer";
import HeapVisualizer from "./HeapVisualizer";
import OutputConsole from "../Components/OutputConsole";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { apiRequest, runJavaCode } from "../Services/api";
import { Play } from "lucide-react";
import LoadingDots from "./LoadingDots";

function EditorPage() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        System.out.println(a + b);
    }
}`);
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outPut, setOutPut] = useState("");

  const handleRun = async () => {
    setIsRunning(true);
    const res = await apiRequest("/api/code/run", { method: "POST", body: JSON.stringify({ code }) });
    if (res) {
      setOutPut(res?.output);
      setIsError(res?.error);
      setIsRunning(false);
    } else {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Code Editor Section */}
        <div className="flex-[2] flex flex-col bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700 bg-slate-900">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Code Editor
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor handleRun={handleRun} setCode={setCode} code={code} />
          </div>
        </div>

        {/* Output & Controls Section */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Output Console */}
          <div className="flex-1 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-900">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Output
              </h2>
            </div>
            <div className="flex-1 overflow-auto">
              <OutputConsole output={outPut} isError={isError} />
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={handleRun}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide text-sm border border-emerald-400/20"
          >
            {!isRunning ? (
              <>
                <Play size={20} />
                Run Code
              </>
            ) : (
              <LoadingDots />
            )}
          </button>
        </div>
      </div>

      {/* Visualizers Section */}
      <div className="border-t border-slate-700 p-4 space-y-4 bg-slate-900/50 overflow-y-auto max-h-80">
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-700 bg-slate-900">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Stack Visualizer
            </h2>
          </div>
          <div className="p-4">
            <StackVisualizer />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-700 bg-slate-900">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Heap Visualizer
            </h2>
          </div>
          <div className="p-4">
            <HeapVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

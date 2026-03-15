import CodeEditor from "./CodeEditor";
import StackVisualizer from "./StackVisualizer";
import HeapVisualizer from "./HeapVisualizer";
import OutputConsole from "../Components/OutputConsole";
import Navbar from "../Components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../Services/api";
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
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [leftWidth, setLeftWidth] = useState(65); // Initial percentage for Editor
  const [isResizing, setIsResizing] = useState(false);

  // Mouse Move Handler
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        // Calculate percentage based on window width
        const newWidth = (mouseMoveEvent.clientX / window.innerWidth) * 100;
        // Constraints (Min 20%, Max 80%)
        if (newWidth > 20 && newWidth < 80) {
          setLeftWidth(newWidth);
        }
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutPut("");
    setSteps([]);
    const res = await apiRequest("http://192.168.1.15:8080/api/code/run", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res) {
      setOutPut(res?.output);
      setIsError(res?.error);
      setSteps(res?.steps || []);
      setIsRunning(false);
    }
    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 select-none">
      <Navbar />

      <div className="flex-1 flex p-4 overflow-hidden relative">
        {/* LEFT SIDE (Editor & Output) */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="flex flex-col gap-4 pr-2 h-full"
        >
          {/* Code Editor */}
          <div className="flex-1 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-900">
              <h2 className="text-sm font-semibold text-slate-300 uppercase">
                Code Editor
              </h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={code}
                setCode={setCode}
                steps={steps}
                currentStep={currentStep}
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="h-48 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden flex flex-col shrink-0">
            <OutputConsole output={outPut} isError={isError} />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRun}
            className="bg-emerald-600 py-3 rounded-lg text-white font-bold shrink-0"
          >
            {!isRunning ? "Run Code" : <LoadingDots />}
          </button>
        </div>

        {/* DRAGGABLE HANDLE */}
        <div
          onMouseDown={startResizing}
          className={`w-2 cursor-col-resize flex items-center justify-center group transition-colors ${
            isResizing ? "bg-blue-600" : "hover:bg-slate-700"
          }`}
        >
          <div className="w-[2px] h-12 bg-slate-500 group-hover:bg-blue-400 rounded-full" />
        </div>

        {/* RIGHT SIDE (Visualizers) */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col gap-4 pl-2 h-full overflow-hidden"
        >
          {/* Stack Visualizer */}
          <div className="flex-1 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden flex flex-col">
            <StackVisualizer steps={steps} setCurrentStep={setCurrentStep} />
          </div>

          {/* Heap Visualizer */}
          <div className="flex-1 bg-slate-800 rounded-lg shadow-lg border border-slate-700 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-700 bg-slate-900 shrink-0">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Heap Visualizer
              </h2>
            </div>
            <div className="flex-1 overflow-auto p-4 min-h-0">
              <HeapVisualizer steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

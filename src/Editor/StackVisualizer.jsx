import { useEffect, useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause, RotateCcw } from "lucide-react";

function StackVisualizer({ steps, setCurrentStep }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Sync with parent state
  useEffect(() => {
    setCurrentStep(index);
  }, [index, setCurrentStep]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps.length]);

  if (!steps || steps.length === 0) {
    return (
      <div className="p-4 text-gray-500 italic text-center border-2 border-dashed border-slate-700 rounded-xl">
        No execution steps captured yet.
      </div>
    );
  }

  const currentStep = steps[index];
  const prevStep = index > 0 ? steps[index - 1] : null;

  return (
    // Fixed: h-full and min-h-0 ensures flex child doesn't expand beyond parent
    <div className="w-full h-full flex flex-col bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900 shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Stack Trace
          </h2>
          <p className="text-xs text-slate-400">
            Step {index + 1} / {steps.length}
          </p>
        </div>

        {/* Controls - Keeping your original icons */}
        <div className="flex gap-2">
          <button
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
            onClick={() => {
              setIndex(0);
              setIsPlaying(false);
            }}
          >
            <RotateCcw size={18} />
          </button>

          <button
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md disabled:opacity-40 transition-colors"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <SkipBack size={18} />
          </button>

          <button
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-40 transition-colors"
            onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
            disabled={index === steps.length - 1}
          >
            <SkipForward size={18} />
          </button>

          {!isPlaying ? (
            <button
              className="p-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsPlaying(true)}
            >
              <Play size={18} />
            </button>
          ) : (
            <button
              className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              onClick={() => setIsPlaying(false)}
            >
              <Pause size={18} />
            </button>
          )}
        </div>
      </div>
      {/* Frame List - Fixed: overflow-y-auto and flex-1 to stay inside the box */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-800/50 scrollbar-thin scrollbar-thumb-slate-600">
        {currentStep.frames?.map((frame, i) => (
          <div
            key={`${index}-${i}`}
            className="bg-slate-900 rounded-md border border-slate-700 shadow-inner shrink-0"
          >
            {/* Frame Header */}
            <div className="flex justify-between items-center px-3 py-2 bg-slate-700/50 border-b border-slate-700 text-xs text-slate-200 font-mono">
              <span className="font-bold text-blue-300 truncate mr-2">
                {frame.method}()
              </span>
              <span className="text-slate-400 shrink-0">line {frame.line}</span>
            </div>

            {/* Local Variables */}
            <div className="p-2 text-[11px] font-mono space-y-1">
              {Object.entries(frame.variables || {}).length > 0 ? (
                Object.entries(frame.variables).map(([name, value]) => {
                  const prevFrame = prevStep?.frames?.find(
                    (f) => f.method === frame.method,
                  );
                  const prevValue = prevFrame?.variables?.[name];

                  let hasChanged = false;
                  const isReference = String(value).startsWith("ref@");

                  if (isReference) {
                    // If reference changed (new object assigned)
                    if (prevValue !== value) {
                      hasChanged = true;
                    } else {
                      // Optional: Check heap object fields for changes
                      const heapObj = currentStep?.heap?.find(
                        (obj) => `ref@${obj.id}` === value,
                      );
                      const prevHeapObj = prevStep?.heap?.find(
                        (obj) => `ref@${obj.id}` === prevValue,
                      );

                      if (heapObj && prevHeapObj) {
                        // Compare each field shallowly
                        for (const key in heapObj.fields) {
                          if (heapObj.fields[key] !== prevHeapObj.fields[key]) {
                            hasChanged = true;
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    // Primitive or string, simple comparison
                    hasChanged = prevValue !== undefined && prevValue !== value;
                  }

                  return (
                    <div
                      key={name}
                      className={`flex justify-between items-center px-2 py-1.5 rounded transition-all duration-700 gap-1 ${
                        hasChanged
                          ? "bg-amber-500/30 ring-1 ring-amber-500/50 animate-pulse text-white"
                          : "bg-slate-800/30"
                      }`}
                    >
                      <span className="text-slate-500 shrink-0">{name}</span>
                      <span
                        className={`break-all text-right w-full sm:w-auto ${
                          isReference
                            ? "text-orange-400 font-bold"
                            : "text-emerald-400"
                        }`}
                      >
                        {String(value)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 italic p-1">
                  No locals in scope
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Bar - shrink-0 ensures it stays at the bottom */}
      <div className="h-1.5 bg-slate-900 shrink-0">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default StackVisualizer;

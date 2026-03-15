import React from "react";
import { Layers } from "lucide-react";

function HeapVisualizer({ steps, currentStep }) {
  const heapData = steps?.[currentStep]?.heap || [];
  const prevHeapData = currentStep > 0 ? steps[currentStep - 1]?.heap : [];

  // Get all reference IDs present in the CURRENT top stack frame
  // This allows us to highlight objects the code is currently touching
  const activeRefs = new Set(
    Object.values(steps?.[currentStep]?.frames?.[0]?.variables || {})
      .filter((val) => String(val).startsWith("ref@"))
      .map((val) => String(val).split("@")[1]),
  );

  if (!steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
        <Layers size={32} className="opacity-20" />
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          Awaiting execution...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {heapData.length > 0 ? (
        heapData.map((obj) => {
          const isCurrentlyReferenced = activeRefs.has(String(obj.id));
          const prevObj = prevHeapData.find((p) => p.id === obj.id);

          return (
            <div
              key={obj.id}
              id={`heap-obj-${obj.id}`}
              className={`bg-slate-900 border rounded-md overflow-hidden transition-all duration-500 shadow-inner ${
                isCurrentlyReferenced
                  ? "border-orange-500/60 ring-1 ring-orange-500/30 shadow-orange-900/20"
                  : "border-slate-700"
              }`}
            >
              {/* Object Header */}
              <div
                className={`px-3 py-1.5 flex justify-between items-center border-b transition-colors duration-500 ${
                  isCurrentlyReferenced
                    ? "bg-orange-500/20 border-orange-500/30"
                    : "bg-slate-700/30 border-slate-700"
                }`}
              >
                <span
                  className={`text-[10px] font-mono font-bold ${isCurrentlyReferenced ? "text-orange-300" : "text-orange-500/70"}`}
                >
                  @id:{obj.id}
                </span>
                <span className="text-[10px] text-slate-400 font-mono italic truncate ml-2">
                  {obj.type}
                </span>
              </div>

              {/* Object Fields / Array Slots */}
              <div className="p-2 space-y-1">
                {Object.entries(obj.fields || {}).length > 0 ? (
                  Object.entries(obj.fields)
                    // Natural sort: [1], [2], [10] instead of [1], [10], [2]
                    .sort(([a], [b]) =>
                      a.localeCompare(b, undefined, { numeric: true }),
                    )
                    .map(([fieldName, value]) => {
                      const isRef = String(value).startsWith("ref@");

                      // Change Detection: Flash if the value changed from the previous step
                      const prevValue = prevObj?.fields?.[fieldName];
                      const hasChanged =
                        prevValue !== undefined && prevValue !== value;

                      return (
                        <div
                          key={fieldName}
                          className={`flex justify-between items-center text-[11px] font-mono px-2 py-0.5 rounded transition-all duration-700 ${
                            hasChanged ? "bg-amber-500/30 text-white" : ""
                          }`}
                        >
                          <span className="text-slate-500">{fieldName}:</span>
                          <span
                            className={`break-all text-right ml-4 ${
                              isRef
                                ? "text-orange-400 font-bold"
                                : "text-slate-300"
                            }`}
                          >
                            {String(value)}
                          </span>
                        </div>
                      );
                    })
                ) : (
                  <div className="text-[10px] text-slate-600 italic px-1">
                    (No internal fields)
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-40 text-slate-600 text-[11px] italic">
          Heap is currently empty
        </div>
      )}
    </div>
  );
}

export default HeapVisualizer;

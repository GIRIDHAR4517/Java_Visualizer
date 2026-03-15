import React from "react";
import { Terminal } from "lucide-react";

function OutputConsole({ output, isError }) {
  return (
    <div className="flex flex-col h-full bg-[#0d1117] font-mono text-sm">
      {/* Header bar within the console */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border-b border-slate-800 shrink-0">
        <Terminal
          size={14}
          className={isError ? "text-red-500" : "text-emerald-500"}
        />
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          System Terminal
        </span>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {output ? (
          <pre
            className={`whitespace-pre-wrap break-all leading-relaxed ${
              isError
                ? "text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.3)]"
                : "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.2)]"
            }`}
          >
            {isError ? "✖ " : "› "}
            {output}
          </pre>
        ) : (
          <span className="text-slate-600 italic text-xs">
            Program output will appear here...
          </span>
        )}
      </div>
    </div>
  );
}

export default OutputConsole;

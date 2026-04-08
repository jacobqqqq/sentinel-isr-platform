"use client";

import { useState } from "react";
import { viewerImages, type ViewerImage, type Detection } from "@/lib/mock-data";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const confidenceColor = (c: number) =>
  c >= 0.9 ? "text-success" : c >= 0.75 ? "text-warning" : "text-danger";

export default function Viewer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [detections, setDetections] = useState<Record<string, Detection[]>>(
    Object.fromEntries(viewerImages.map((img) => [img.id, [...img.detections]]))
  );

  const selected: ViewerImage = viewerImages[selectedIdx];
  const currentDetections = detections[selected.id];

  const toggleDetection = (detId: string, status: "accepted" | "rejected") => {
    setDetections((prev) => ({
      ...prev,
      [selected.id]: prev[selected.id].map((d) =>
        d.id === detId ? { ...d, status: d.status === status ? "pending" : status } : d
      ),
    }));
  };

  return (
    <div className="grid grid-cols-[200px_1fr_320px] gap-0 h-[calc(100vh-53px)]">
      {/* Left: Thumbnail Strip */}
      <div className="bg-panel border-r border-border overflow-y-auto">
        <div className="px-3 py-3 border-b border-border">
          <h2 className="font-mono text-xs text-accent tracking-wide">IMAGE LIBRARY</h2>
        </div>
        {viewerImages.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelectedIdx(i)}
            className={cn(
              "w-full text-left px-3 py-3 border-b border-border/50 transition-colors",
              i === selectedIdx ? "bg-accent/10 border-l-2 border-l-accent" : "hover:bg-white/[0.02]"
            )}
          >
            <div className="bg-background/50 rounded h-20 mb-2 flex items-center justify-center border border-border/50">
              <span className="font-mono text-[10px] text-secondary">{img.source}</span>
            </div>
            <div className="font-mono text-[10px] text-foreground truncate">{img.id}</div>
            <div className="text-[10px] text-secondary truncate">{img.filename}</div>
            <div className="text-[10px] text-secondary mt-0.5">{img.detections.length} detections</div>
          </button>
        ))}
      </div>

      {/* Center: Main Viewer */}
      <div className="bg-background relative flex flex-col">
        <div className="px-4 py-2 border-b border-border bg-panel/50 flex items-center justify-between">
          <div>
            <span className="font-mono text-sm text-foreground">{selected.filename}</span>
            <span className="text-xs text-secondary ml-3">{selected.source}</span>
          </div>
          <span className="font-mono text-xs text-secondary">
            {new Date(selected.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          {/* Simulated satellite image background */}
          <svg viewBox="0 0 640 480" className="w-full h-full max-w-full max-h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="terrain" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#0f1a2e" />
                <rect x="0" y="0" width="10" height="10" fill="#111d32" opacity="0.5" />
                <rect x="10" y="10" width="10" height="10" fill="#0d1728" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="640" height="480" fill="url(#terrain)" />
            {/* Roads */}
            <line x1="0" y1="240" x2="640" y2="240" stroke="#1a2744" strokeWidth="2" />
            <line x1="320" y1="0" x2="320" y2="480" stroke="#1a2744" strokeWidth="1.5" />
            {/* Bounding boxes */}
            {currentDetections.map((d) => (
              <g key={d.id}>
                <rect
                  x={d.bbox.x} y={d.bbox.y} width={d.bbox.w} height={d.bbox.h}
                  fill="none"
                  stroke={d.status === "accepted" ? "#22c55e" : d.status === "rejected" ? "#ef4444" : "#00D9FF"}
                  strokeWidth="2"
                  strokeDasharray={d.status === "pending" ? "4 2" : "none"}
                />
                <rect x={d.bbox.x} y={d.bbox.y - 14} width={d.bbox.w} height={14} fill="rgba(0,0,0,0.7)" />
                <text
                  x={d.bbox.x + 3} y={d.bbox.y - 3}
                  fill={d.status === "accepted" ? "#22c55e" : d.status === "rejected" ? "#ef4444" : "#00D9FF"}
                  fontSize="10" fontFamily="monospace"
                >
                  {d.label} {(d.confidence * 100).toFixed(0)}%
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Right: Detection Panel */}
      <div className="bg-panel border-l border-border overflow-y-auto">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-mono text-xs text-accent tracking-wide">DETECTIONS</h2>
          <span className="font-mono text-xs text-secondary">{currentDetections.length} objects</span>
        </div>
        {currentDetections.map((d) => (
          <div key={d.id} className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-mono text-sm text-foreground">{d.label}</span>
                <span className={cn("font-mono text-xs ml-2", confidenceColor(d.confidence))}>
                  {(d.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <span className={cn(
                "text-[10px] font-mono px-1.5 py-0.5 rounded",
                d.status === "accepted" && "bg-success/20 text-success",
                d.status === "rejected" && "bg-danger/20 text-danger",
                d.status === "pending" && "bg-accent/10 text-accent"
              )}>
                {d.status.toUpperCase()}
              </span>
            </div>
            <div className="font-mono text-[10px] text-secondary mb-2">
              bbox: [{d.bbox.x}, {d.bbox.y}, {d.bbox.w}, {d.bbox.h}]
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleDetection(d.id, "accepted")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-colors border",
                  d.status === "accepted"
                    ? "bg-success/20 border-success/40 text-success"
                    : "border-border text-secondary hover:border-success/40 hover:text-success"
                )}
              >
                <Check size={12} /> Accept
              </button>
              <button
                onClick={() => toggleDetection(d.id, "rejected")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-colors border",
                  d.status === "rejected"
                    ? "bg-danger/20 border-danger/40 text-danger"
                    : "border-border text-secondary hover:border-danger/40 hover:text-danger"
                )}
              >
                <X size={12} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

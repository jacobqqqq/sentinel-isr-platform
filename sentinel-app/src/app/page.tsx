"use client";

import { pendingQueue, mapMarkers, todayMetrics } from "@/lib/mock-data";
import { Clock, ImageIcon, Zap, Target, Radio, AlertTriangle } from "lucide-react";

const priorityColor: Record<string, string> = {
  critical: "bg-danger/20 text-danger border-danger/30",
  high: "bg-warning/20 text-warning border-warning/30",
  medium: "bg-accent/20 text-accent border-accent/30",
  low: "bg-secondary/20 text-secondary border-secondary/30",
};

const statusDot: Record<string, string> = {
  pending: "bg-warning",
  processing: "bg-accent animate-pulse",
  complete: "bg-success",
};

function MetricCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-panel border border-border rounded p-4">
      <div className="flex items-center gap-2 text-secondary text-xs mb-2">
        <Icon size={14} />
        <span>{label}</span>
      </div>
      <div className="font-mono text-2xl text-foreground">{value}</div>
      {sub && <div className="text-xs text-secondary mt-1">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[320px_1fr_280px] gap-4 p-4 h-[calc(100vh-53px)]">
      {/* Left: Pending Queue */}
      <div className="bg-panel border border-border rounded flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-mono text-sm text-accent tracking-wide">PENDING QUEUE</h2>
          <span className="font-mono text-xs text-secondary">{pendingQueue.filter(i => i.status === "pending").length} pending</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {pendingQueue.map((img) => (
            <div key={img.id} className="px-4 py-3 border-b border-border/50 hover:bg-white/[0.02] transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-foreground">{img.id}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${priorityColor[img.priority]}`}>
                  {img.priority.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-secondary truncate">{img.filename}</div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-secondary">{img.source}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[img.status]}`} />
                  <span className="text-[10px] text-secondary">{img.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Ops Map */}
      <div className="bg-panel border border-border rounded flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-mono text-sm text-accent tracking-wide">OPERATIONS MAP</h2>
        </div>
        <div className="flex-1 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i}>
                <line x1={i * 10} y1={0} x2={i * 10} y2={100} stroke="#2a2a2a" strokeWidth={0.2} />
                <line x1={0} y1={i * 10} x2={100} y2={i * 10} stroke="#2a2a2a" strokeWidth={0.2} />
              </g>
            ))}
            {/* Region outlines */}
            <polygon points="10,10 45,8 50,35 30,40 12,30" fill="none" stroke="#2a2a2a" strokeWidth={0.3} />
            <polygon points="50,15 85,10 90,45 60,50 48,35" fill="none" stroke="#2a2a2a" strokeWidth={0.3} />
            <polygon points="5,50 35,45 45,70 30,85 8,75" fill="none" stroke="#2a2a2a" strokeWidth={0.3} />
            <polygon points="50,50 80,45 88,75 65,85 48,70" fill="none" stroke="#2a2a2a" strokeWidth={0.3} />
            <defs>
              <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {mapMarkers.map((m) => (
              <g key={m.id} className="map-marker-group" style={{ cursor: "pointer" }}>
                <circle cx={m.x} cy={m.y} r={1.2} fill="#00D9FF" className="marker-pulse" />
                <circle cx={m.x} cy={m.y} r={0.7} fill="#00D9FF" className="marker-dot" filter="url(#marker-glow)" />
                <g className="marker-tooltip">
                  <rect
                    x={m.x - 5}
                    y={m.y - 5.5}
                    width={10}
                    height={3}
                    rx={0.5}
                    fill="#0A1628"
                    stroke="#00D9FF"
                    strokeWidth={0.15}
                    opacity={0.9}
                  />
                  <text x={m.x} y={m.y - 3.4} textAnchor="middle" fill="#00D9FF" fontSize={1.8} fontFamily="monospace">
                    {m.label}
                  </text>
                </g>
                {/* Invisible hit area for easier hover */}
                <circle cx={m.x} cy={m.y} r={3} fill="transparent" />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Right: Today's Metrics */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        <div className="px-1 py-1">
          <h2 className="font-mono text-sm text-accent tracking-wide">TODAY&apos;S METRICS</h2>
        </div>
        <MetricCard icon={ImageIcon} label="Images Processed" value={todayMetrics.imagesProcessed.toLocaleString()} sub="+147 from yesterday" />
        <MetricCard icon={Clock} label="Time Saved" value={`${todayMetrics.timeSavedHours}h`} sub="vs manual analysis" />
        <MetricCard icon={Target} label="Accuracy Rate" value={`${todayMetrics.accuracyRate}%`} sub="validated detections" />
        <MetricCard icon={Zap} label="Pending Review" value={todayMetrics.pendingReview} sub="awaiting analyst" />
        <MetricCard icon={Radio} label="Active Operations" value={todayMetrics.activeOperations} sub="across all sectors" />
        <MetricCard icon={AlertTriangle} label="Alerts Today" value={todayMetrics.alertsToday} sub="3 critical, 5 standard" />
      </div>
    </div>
  );
}

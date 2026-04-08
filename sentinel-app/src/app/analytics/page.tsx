"use client";

import { kpis, dailyVolume, comparisonData, activityFeed } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from "recharts";

function KPICard({ label, value, change, unit }: { label: string; value: string; change: number; unit: string }) {
  const positive = change >= 0;
  return (
    <div className="bg-panel border border-border rounded p-4">
      <div className="text-xs text-secondary mb-1">{label}</div>
      <div className="font-mono text-3xl text-foreground">{value}</div>
      <div className="flex items-center gap-1 mt-2">
        {positive ? <TrendingUp size={12} className="text-success" /> : <TrendingDown size={12} className="text-danger" />}
        <span className={`font-mono text-xs ${positive ? "text-success" : "text-danger"}`}>
          {positive ? "+" : ""}{change}%
        </span>
        <span className="text-[10px] text-secondary ml-1">{unit}</span>
      </div>
    </div>
  );
}

const actionColor: Record<string, string> = {
  Detection: "text-accent",
  Review: "text-success",
  Alert: "text-danger",
  Export: "text-warning",
  Config: "text-secondary",
  Ingest: "text-accent",
};

export default function Analytics() {
  return (
    <div className="p-4 space-y-4 h-[calc(100vh-53px)] overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        {/* 30-Day Volume Bar Chart */}
        <div className="bg-panel border border-border rounded p-4">
          <h3 className="font-mono text-sm text-accent tracking-wide mb-4">30-DAY PROCESSING VOLUME</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} interval={4} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 4, fontSize: 12 }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#00D9FF" }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {dailyVolume.map((_, i) => (
                    <Cell key={i} fill={i >= 25 ? "#00D9FF" : "#00D9FF40"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Manual vs AI Comparison */}
        <div className="bg-panel border border-border rounded p-4">
          <h3 className="font-mono text-sm text-accent tracking-wide mb-4">MANUAL vs AI TIME (minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
                <YAxis dataKey="task" type="category" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} width={110} />
                <Tooltip
                  contentStyle={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 4, fontSize: 12 }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Bar dataKey="manual" fill="#ef444480" name="Manual" radius={[0, 2, 2, 0]} />
                <Bar dataKey="ai" fill="#00D9FF" name="AI" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-panel border border-border rounded p-4">
        <h3 className="font-mono text-sm text-accent tracking-wide mb-3">ACTIVITY FEED</h3>
        <div className="space-y-0">
          {activityFeed.map((entry) => (
            <div key={entry.id} className="flex items-start gap-4 py-2.5 border-b border-border/50 last:border-0">
              <span className="font-mono text-[10px] text-secondary whitespace-nowrap pt-0.5">
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className={`font-mono text-xs font-medium w-20 ${actionColor[entry.action] || "text-secondary"}`}>
                {entry.action}
              </span>
              <span className="text-xs text-secondary flex-1">{entry.detail}</span>
              <span className="text-[10px] text-secondary">{entry.user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

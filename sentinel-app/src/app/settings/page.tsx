"use client";

import { useState } from "react";
import { settingsConfig } from "@/lib/mock-data";
import { Eye, EyeOff, Download } from "lucide-react";

export default function Settings() {
  const [config, setConfig] = useState(settingsConfig);
  const [selectedFormat, setSelectedFormat] = useState(config.exportFormats[0]);
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});

  const toggleObjectType = (key: string) => {
    setConfig((prev) => ({
      ...prev,
      objectTypes: prev.objectTypes.map((t) =>
        t.key === key ? { ...t, enabled: !t.enabled } : t
      ),
    }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6 h-[calc(100vh-53px)] overflow-y-auto">
      <h1 className="font-mono text-sm text-accent tracking-wide">SYSTEM CONFIGURATION</h1>

      {/* Detection Thresholds */}
      <div className="bg-panel border border-border rounded p-5">
        <h2 className="font-mono text-sm text-foreground mb-4">Detection Thresholds</h2>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-secondary">Confidence Threshold</label>
              <span className="font-mono text-sm text-accent">{config.confidenceThreshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0} max={1} step={0.01}
              value={config.confidenceThreshold}
              onChange={(e) => setConfig((p) => ({ ...p, confidenceThreshold: parseFloat(e.target.value) }))}
              className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] text-secondary mt-1">
              <span>0.00 (all detections)</span>
              <span>1.00 (highest confidence only)</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-secondary">Minimum Object Size (px)</label>
              <span className="font-mono text-sm text-accent">{config.minObjectSize}</span>
            </div>
            <input
              type="range"
              min={5} max={100} step={1}
              value={config.minObjectSize}
              onChange={(e) => setConfig((p) => ({ ...p, minObjectSize: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] text-secondary mt-1">
              <span>5px</span>
              <span>100px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Object Types */}
      <div className="bg-panel border border-border rounded p-5">
        <h2 className="font-mono text-sm text-foreground mb-4">Object Types</h2>
        <div className="grid grid-cols-3 gap-3">
          {config.objectTypes.map((t) => (
            <button
              key={t.key}
              onClick={() => toggleObjectType(t.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded border transition-colors text-left ${
                t.enabled
                  ? "border-accent/40 bg-accent/10 text-foreground"
                  : "border-border bg-transparent text-secondary"
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                t.enabled ? "border-accent bg-accent" : "border-secondary"
              }`}>
                {t.enabled && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#0A1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-panel border border-border rounded p-5">
        <h2 className="font-mono text-sm text-foreground mb-4">API Keys</h2>
        <div className="space-y-3">
          {config.apiKeys.map((key, i) => (
            <div key={i}>
              <label className="text-xs text-secondary mb-1.5 block">{key.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type={showKeys[i] ? "text" : "password"}
                  value={key.value}
                  readOnly
                  className="flex-1 bg-background border border-border rounded px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-accent"
                />
                <button
                  onClick={() => setShowKeys((p) => ({ ...p, [i]: !p[i] }))}
                  className="p-2 border border-border rounded text-secondary hover:text-foreground transition-colors"
                >
                  {showKeys[i] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Generator */}
      <div className="bg-panel border border-border rounded p-5">
        <h2 className="font-mono text-sm text-foreground mb-4">Export Generator</h2>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-xs text-secondary mb-1.5 block">Output Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent appearance-none cursor-pointer"
            >
              {config.exportFormats.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 px-5 py-2 bg-accent text-background font-medium text-sm rounded hover:bg-accent/90 transition-colors">
            <Download size={14} />
            Generate Export
          </button>
        </div>
      </div>
    </div>
  );
}

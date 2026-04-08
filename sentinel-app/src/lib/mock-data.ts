// ── Types ──────────────────────────────────────────────
export interface QueueImage {
  id: string;
  filename: string;
  timestamp: string;
  priority: "critical" | "high" | "medium" | "low";
  source: string;
  status: "pending" | "processing" | "complete";
}

export interface MapMarker {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "recon" | "surveillance" | "patrol";
}

export interface DailyMetrics {
  imagesProcessed: number;
  timeSavedHours: number;
  accuracyRate: number;
  pendingReview: number;
  activeOperations: number;
  alertsToday: number;
}

export interface Detection {
  id: string;
  label: string;
  confidence: number;
  bbox: { x: number; y: number; w: number; h: number };
  status: "pending" | "accepted" | "rejected";
}

export interface ViewerImage {
  id: string;
  filename: string;
  timestamp: string;
  source: string;
  detections: Detection[];
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  unit: string;
}

export interface DailyVolume {
  date: string;
  count: number;
}

export interface ComparisonEntry {
  task: string;
  manual: number;
  ai: number;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  detail: string;
}

export interface SettingsConfig {
  confidenceThreshold: number;
  minObjectSize: number;
  objectTypes: { label: string; key: string; enabled: boolean }[];
  apiKeys: { label: string; value: string; masked: boolean }[];
  exportFormats: string[];
}

// ── Mock Data ──────────────────────────────────────────

export const pendingQueue: QueueImage[] = [
  { id: "IMG-0421", filename: "sector_7_pass_0421.tif", timestamp: "2026-04-07T08:12:00Z", priority: "critical", source: "SAT-3", status: "pending" },
  { id: "IMG-0422", filename: "sector_7_pass_0422.tif", timestamp: "2026-04-07T08:14:00Z", priority: "high", source: "SAT-3", status: "processing" },
  { id: "IMG-0423", filename: "zone_alpha_sweep.tif", timestamp: "2026-04-07T07:55:00Z", priority: "high", source: "UAV-12", status: "pending" },
  { id: "IMG-0424", filename: "coastal_monitor_daily.tif", timestamp: "2026-04-07T07:30:00Z", priority: "medium", source: "SAT-1", status: "pending" },
  { id: "IMG-0425", filename: "border_crossing_east.tif", timestamp: "2026-04-07T07:10:00Z", priority: "medium", source: "UAV-7", status: "complete" },
  { id: "IMG-0426", filename: "port_surveillance_am.tif", timestamp: "2026-04-07T06:45:00Z", priority: "low", source: "SAT-2", status: "pending" },
  { id: "IMG-0427", filename: "northern_corridor.tif", timestamp: "2026-04-07T06:20:00Z", priority: "low", source: "UAV-3", status: "pending" },
  { id: "IMG-0428", filename: "airfield_recon_12.tif", timestamp: "2026-04-07T06:00:00Z", priority: "critical", source: "SAT-4", status: "processing" },
];

export const mapMarkers: MapMarker[] = [
  { id: "op-1", label: "ALPHA", x: 25, y: 30, type: "recon" },
  { id: "op-2", label: "BRAVO", x: 55, y: 20, type: "surveillance" },
  { id: "op-3", label: "CHARLIE", x: 70, y: 55, type: "patrol" },
  { id: "op-4", label: "DELTA", x: 40, y: 65, type: "recon" },
  { id: "op-5", label: "ECHO", x: 80, y: 40, type: "surveillance" },
  { id: "op-6", label: "FOXTROT", x: 15, y: 75, type: "patrol" },
];

export const todayMetrics: DailyMetrics = {
  imagesProcessed: 1247,
  timeSavedHours: 34.5,
  accuracyRate: 96.8,
  pendingReview: 23,
  activeOperations: 6,
  alertsToday: 8,
};

export const viewerImages: ViewerImage[] = [
  {
    id: "IMG-0421",
    filename: "sector_7_pass_0421.tif",
    timestamp: "2026-04-07T08:12:00Z",
    source: "SAT-3",
    detections: [
      { id: "d1", label: "Vehicle", confidence: 0.94, bbox: { x: 120, y: 80, w: 60, h: 40 }, status: "pending" },
      { id: "d2", label: "Structure", confidence: 0.87, bbox: { x: 300, y: 200, w: 100, h: 80 }, status: "pending" },
      { id: "d3", label: "Vehicle", confidence: 0.72, bbox: { x: 450, y: 150, w: 50, h: 35 }, status: "pending" },
    ],
  },
  {
    id: "IMG-0422",
    filename: "sector_7_pass_0422.tif",
    timestamp: "2026-04-07T08:14:00Z",
    source: "SAT-3",
    detections: [
      { id: "d4", label: "Aircraft", confidence: 0.98, bbox: { x: 200, y: 100, w: 80, h: 60 }, status: "accepted" },
      { id: "d5", label: "Vehicle", confidence: 0.65, bbox: { x: 500, y: 300, w: 45, h: 30 }, status: "rejected" },
    ],
  },
  {
    id: "IMG-0423",
    filename: "zone_alpha_sweep.tif",
    timestamp: "2026-04-07T07:55:00Z",
    source: "UAV-12",
    detections: [
      { id: "d6", label: "Personnel", confidence: 0.81, bbox: { x: 350, y: 250, w: 30, h: 50 }, status: "pending" },
      { id: "d7", label: "Vehicle", confidence: 0.91, bbox: { x: 100, y: 350, w: 70, h: 45 }, status: "pending" },
      { id: "d8", label: "Structure", confidence: 0.76, bbox: { x: 550, y: 100, w: 90, h: 70 }, status: "accepted" },
      { id: "d9", label: "Equipment", confidence: 0.68, bbox: { x: 400, y: 400, w: 40, h: 35 }, status: "pending" },
    ],
  },
  {
    id: "IMG-0424",
    filename: "coastal_monitor_daily.tif",
    timestamp: "2026-04-07T07:30:00Z",
    source: "SAT-1",
    detections: [
      { id: "d10", label: "Vessel", confidence: 0.96, bbox: { x: 250, y: 180, w: 110, h: 50 }, status: "pending" },
      { id: "d11", label: "Vessel", confidence: 0.89, bbox: { x: 480, y: 220, w: 90, h: 40 }, status: "pending" },
    ],
  },
  {
    id: "IMG-0425",
    filename: "border_crossing_east.tif",
    timestamp: "2026-04-07T07:10:00Z",
    source: "UAV-7",
    detections: [
      { id: "d12", label: "Vehicle", confidence: 0.93, bbox: { x: 180, y: 300, w: 55, h: 40 }, status: "accepted" },
    ],
  },
];

export const kpis: KPI[] = [
  { label: "Images Processed", value: "12,847", change: 12.3, unit: "this month" },
  { label: "Avg Processing Time", value: "2.4s", change: -18.5, unit: "per image" },
  { label: "Detection Accuracy", value: "96.8%", change: 1.2, unit: "validated" },
  { label: "Time Saved", value: "342h", change: 24.1, unit: "vs manual" },
];

export const dailyVolume: DailyVolume[] = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  count: Math.floor(300 + Math.random() * 200 + (i > 20 ? 100 : 0)),
}));

export const comparisonData: ComparisonEntry[] = [
  { task: "Initial Scan", manual: 45, ai: 3 },
  { task: "Object Detection", manual: 30, ai: 2 },
  { task: "Classification", manual: 25, ai: 4 },
  { task: "Report Generation", manual: 20, ai: 1 },
  { task: "Quality Review", manual: 15, ai: 5 },
];

export const activityFeed: ActivityEntry[] = [
  { id: "a1", timestamp: "2026-04-07T08:12:00Z", action: "Detection", user: "System", detail: "3 objects detected in sector_7_pass_0421.tif" },
  { id: "a2", timestamp: "2026-04-07T08:05:00Z", action: "Review", user: "Analyst Chen", detail: "Approved 12 detections in batch #447" },
  { id: "a3", timestamp: "2026-04-07T07:58:00Z", action: "Alert", user: "System", detail: "High-priority target identified in zone_alpha_sweep.tif" },
  { id: "a4", timestamp: "2026-04-07T07:45:00Z", action: "Export", user: "Analyst Rivera", detail: "Generated SITREP for coastal_monitor batch" },
  { id: "a5", timestamp: "2026-04-07T07:30:00Z", action: "Config", user: "Admin Park", detail: "Updated confidence threshold to 0.75" },
  { id: "a6", timestamp: "2026-04-07T07:15:00Z", action: "Detection", user: "System", detail: "2 vessels detected in coastal_monitor_daily.tif" },
  { id: "a7", timestamp: "2026-04-07T07:00:00Z", action: "Ingest", user: "System", detail: "8 new images queued from SAT-3 morning pass" },
  { id: "a8", timestamp: "2026-04-07T06:45:00Z", action: "Review", user: "Analyst Chen", detail: "Rejected false positive in port_surveillance_am.tif" },
];

export const settingsConfig: SettingsConfig = {
  confidenceThreshold: 0.75,
  minObjectSize: 20,
  objectTypes: [
    { label: "Vehicles", key: "vehicles", enabled: true },
    { label: "Aircraft", key: "aircraft", enabled: true },
    { label: "Vessels", key: "vessels", enabled: true },
    { label: "Personnel", key: "personnel", enabled: false },
    { label: "Structures", key: "structures", enabled: true },
    { label: "Equipment", key: "equipment", enabled: false },
  ],
  apiKeys: [
    { label: "Satellite Provider", value: "sk-sat-xxxxxxxxxxxx", masked: true },
    { label: "Object Detection API", value: "sk-det-xxxxxxxxxxxx", masked: true },
    { label: "Export Service", value: "sk-exp-xxxxxxxxxxxx", masked: true },
  ],
  exportFormats: ["GeoJSON", "KML", "Shapefile", "CSV", "PDF Report", "NITF"],
};

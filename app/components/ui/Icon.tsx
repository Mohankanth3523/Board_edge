import {
  Activity,
  Cable,
  CircuitBoard,
  CodeXml,
  Cog,
  Cpu,
  FlaskConical,
  GraduationCap,
  Layers,
  Microchip,
  RadioTower,
  ScanSearch,
  Waypoints,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "~/content/services";

/** Maps content icon keys to Lucide icons (tree-shaken, only these ship). */
const registry: Record<IconKey, LucideIcon> = {
  flask: FlaskConical,
  "circuit-board": CircuitBoard,
  cpu: Cpu,
  "radio-tower": RadioTower,
  code: CodeXml,
  waypoints: Waypoints,
  activity: Activity,
  microchip: Microchip,
  wrench: Wrench,
  scan: ScanSearch,
  cable: Cable,
  zap: Zap,
  layers: Layers,
  graduation: GraduationCap,
  cog: Cog,
};

export function ServiceIcon({ name, className, size = 22 }: { name: IconKey; className?: string; size?: number }) {
  const Cmp = registry[name];
  return <Cmp aria-hidden="true" size={size} strokeWidth={1.5} className={className} />;
}

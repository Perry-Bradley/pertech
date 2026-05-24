import {
  Palette,
  Search,
  Globe,
  Layers,
  Smartphone,
  Share2,
  PenTool,
  Code,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Palette,
  Search,
  Globe,
  Layers,
  Smartphone,
  Share2,
  PenTool,
  Code,
  Megaphone,
  Sparkles,
};

export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Layers;
  return iconMap[name] ?? Layers;
}

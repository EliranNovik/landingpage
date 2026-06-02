import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileText,
  Globe,
  Languages,
  Landmark,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";

export type ServiceItemId =
  | "notarial"
  | "translation"
  | "acquisition"
  | "fbi"
  | "police"
  | "apostilles"
  | "foreignLaw"
  | "archive";

export type ProcessStepId = "submit" | "review" | "handling" | "delivery";

export const serviceItems: { id: ServiceItemId; icon: LucideIcon }[] = [
  { id: "notarial", icon: FileText },
  { id: "translation", icon: Languages },
  { id: "acquisition", icon: Globe },
  { id: "fbi", icon: ShieldCheck },
  { id: "police", icon: BadgeCheck },
  { id: "apostilles", icon: Landmark },
  { id: "foreignLaw", icon: Scale },
  { id: "archive", icon: Search },
];

export const processItems: { id: ProcessStepId; step: number }[] = [
  { id: "submit", step: 1 },
  { id: "review", step: 2 },
  { id: "handling", step: 3 },
  { id: "delivery", step: 4 },
];

export type WhyChooseId =
  | "experienced"
  | "international"
  | "authorities"
  | "communication"
  | "expertise"
  | "archive";

export const whyChoosePoints: { id: WhyChooseId }[] = [
  { id: "experienced" },
  { id: "international" },
  { id: "authorities" },
  { id: "communication" },
  { id: "expertise" },
  { id: "archive" },
];

export const countryCodes = [
  { value: "+972", labelKey: "il" },
  { value: "+1", labelKey: "us" },
  { value: "+44", labelKey: "uk" },
  { value: "+49", labelKey: "de" },
  { value: "+43", labelKey: "at" },
] as const;

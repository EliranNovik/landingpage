import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FilePen,
  FileText,
  Globe,
  Languages,
  Landmark,
  Medal,
  Scale,
  Search,
  ShieldCheck,
  Stamp,
} from "lucide-react";

export type ServiceItemId =
  | "notarial"
  | "translation"
  | "acquisition"
  | "fbi"
  | "police"
  | "apostilles"
  | "foreignLaw"
  | "archive"
  | "epa"
  | "notarizedPoA"
  | "idfCertificates";

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
  { id: "epa", icon: FilePen },
  { id: "notarizedPoA", icon: Stamp },
  { id: "idfCertificates", icon: Medal },
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


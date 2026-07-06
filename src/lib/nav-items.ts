import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  FlaskConical,
  Home,
  Mail,
  Terminal,
  BookOpen,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    shortcut: "H",
    description: "System dashboard",
  },
  {
    label: "Products",
    href: "/products",
    icon: Boxes,
    shortcut: "P",
    description: "Shipped & in-progress builds",
  },
  {
    label: "Research",
    href: "/research",
    icon: FlaskConical,
    shortcut: "R",
    description: "Experiments & architecture notes",
  },
  {
    label: "Experience",
    href: "/experience",
    icon: Terminal,
    shortcut: "E",
    description: "Work log",
  },
  {
    label: "Writing",
    href: "/writing",
    icon: BookOpen,
    shortcut: "W",
    description: "Essays & notes",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
    shortcut: "C",
    description: "Get in touch",
  },
];

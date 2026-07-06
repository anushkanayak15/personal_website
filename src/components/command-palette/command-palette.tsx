"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { NAV_ITEMS } from "@/lib/nav-items";
import {
  closeCommandPalette,
  subscribeCommandPalette,
  toggleCommandPalette,
} from "./command-palette-store";

const ACTIONS = [
  {
    label: "Email me",
    icon: Mail,
    href: "mailto:hello@anushkanayak.dev",
  },
  {
    label: "Open GitHub",
    icon: GithubIcon,
    href: "https://github.com/anushkanayak",
  },
  {
    label: "Open LinkedIn",
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/anushkanayak",
  },
  {
    label: "Download resume",
    icon: FileText,
    href: "/resume.pdf",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => subscribeCommandPalette(setOpen), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandPalette();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runAndClose = (fn: () => void) => {
    fn();
    closeCommandPalette();
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={(v) => (v ? undefined : closeCommandPalette())}
          label="Command palette"
          shouldFilter
          className="fixed inset-0 z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => closeCommandPalette()}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="glass fixed left-1/2 top-[18%] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border shadow-2xl"
          >
            <div className="flex items-center border-b border-border px-4">
              <Command.Input
                autoFocus
                placeholder="Type a command or search..."
                className="h-12 w-full bg-transparent font-mono text-sm text-foreground placeholder:text-subtle-foreground outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-subtle-foreground">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-[50vh] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Navigate"
                className="px-2 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground [&_[cmdk-group-items]]:mt-1"
              >
                {NAV_ITEMS.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => runAndClose(() => router.push(item.href))}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground data-[selected=true]:bg-white/[0.06]"
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="size-4 text-muted-foreground" />
                      {item.label}
                    </span>
                    <span className="text-xs text-subtle-foreground">
                      {item.description}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Separator className="my-1 h-px bg-border" />

              <Command.Group
                heading="Actions"
                className="px-2 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-subtle-foreground [&_[cmdk-group-items]]:mt-1"
              >
                {ACTIONS.map((action) => (
                  <Command.Item
                    key={action.label}
                    value={action.label}
                    onSelect={() =>
                      runAndClose(() => window.open(action.href, "_blank"))
                    }
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground data-[selected=true]:bg-white/[0.06]"
                  >
                    <action.icon className="size-4 text-muted-foreground" />
                    {action.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}

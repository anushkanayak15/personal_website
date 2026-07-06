"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                  Name
                </label>
                <Input required placeholder="Jane Doe" name="name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                  Email
                </label>
                <Input required type="email" placeholder="jane@company.com" name="email" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle-foreground">
                Message
              </label>
              <Textarea required placeholder="What are you building?" name="message" />
            </div>
            <Button type="submit" className="mt-2 self-start">
              Send message
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-3 py-12 text-center"
          >
            <CheckCircle2 className="size-8 text-accent" />
            <p className="font-heading text-base font-medium text-foreground">
              Message queued
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              This is a placeholder confirmation — form submission isn&apos;t wired
              to a backend yet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

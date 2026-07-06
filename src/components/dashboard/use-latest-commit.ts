"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/content/profile";

export interface LatestCommit {
  repo: string;
  message: string;
  url: string;
  createdAt: string;
}

interface GithubPushEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { head?: string };
}

interface GithubCommitResponse {
  commit: { message: string };
  html_url: string;
}

type Status = "loading" | "success" | "error";

export function useLatestCommit() {
  const [status, setStatus] = useState<Status>("loading");
  const [commit, setCommit] = useState<LatestCommit | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const eventsRes = await fetch(
          `https://api.github.com/users/${PROFILE.githubHandle}/events/public`
        );
        if (!eventsRes.ok) throw new Error("GitHub API error");
        const events: GithubPushEvent[] = await eventsRes.json();
        const push = events.find((e) => e.type === "PushEvent" && e.payload.head);
        if (!push || !push.payload.head) throw new Error("No recent push events");

        const commitRes = await fetch(
          `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`
        );
        if (!commitRes.ok) throw new Error("GitHub commit lookup failed");
        const commitData: GithubCommitResponse = await commitRes.json();

        if (cancelled) return;
        setCommit({
          repo: push.repo.name.replace(`${PROFILE.githubHandle}/`, ""),
          message: commitData.commit.message.split("\n")[0],
          url: commitData.html_url,
          createdAt: push.created_at,
        });
        setStatus("success");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, commit };
}

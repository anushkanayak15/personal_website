import type { Metadata } from "next";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { CommandCard } from "@/components/ui/command-card";
import { Reveal } from "@/components/motion/reveal";
import { PROFILE } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Anushka Nayak — email, GitHub, LinkedIn, or resume.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Open a channel"
        description="The fastest way to reach me."
      />

      <Reveal className="mt-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CommandCard
            href={`mailto:${PROFILE.email}`}
            icon={<Mail strokeWidth={1.75} />}
            title="Email"
            description={PROFILE.email}
          />
          <CommandCard
            href={PROFILE.github}
            icon={<GithubIcon />}
            title="GitHub"
            description={`@${PROFILE.githubHandle}`}
          />
          <CommandCard
            href={PROFILE.linkedin}
            icon={<LinkedinIcon />}
            title="LinkedIn"
            description={`in/${PROFILE.githubHandle}`}
          />
          <CommandCard
            href={PROFILE.resumeUrl}
            icon={<FileText strokeWidth={1.75} />}
            title="Resume"
            description="Download PDF"
          />
        </div>
      </Reveal>
    </PageShell>
  );
}

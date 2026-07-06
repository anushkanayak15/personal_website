import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { CommandCard } from "@/components/ui/command-card";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Open a channel"
        description="The fastest way to reach me, or send a message directly."
      />

      <Reveal className="mt-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CommandCard
            href="mailto:hello@anushkanayak.dev"
            icon={<Mail strokeWidth={1.75} />}
            title="Email"
            description="hello@anushkanayak.dev"
          />
          <CommandCard
            href="https://github.com/anushkanayak"
            icon={<GithubIcon />}
            title="GitHub"
            description="@anushkanayak"
          />
          <CommandCard
            href="https://linkedin.com/in/anushkanayak"
            icon={<LinkedinIcon />}
            title="LinkedIn"
            description="in/anushkanayak"
          />
          <CommandCard
            href="/resume.pdf"
            icon={<FileText strokeWidth={1.75} />}
            title="Resume"
            description="Download PDF"
          />
        </div>
      </Reveal>

      <div className="mt-14">
        <SectionLabel>Direct message</SectionLabel>
        <Reveal delay={0.05}>
          <Card className="mt-5 p-6 sm:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </PageShell>
  );
}

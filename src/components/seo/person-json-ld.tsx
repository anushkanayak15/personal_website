import { PROFILE, SITE_URL } from "@/content/profile";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    url: SITE_URL,
    email: PROFILE.email,
    sameAs: [PROFILE.github, PROFILE.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PROFILE.education.school,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

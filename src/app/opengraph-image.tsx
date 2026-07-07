import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { PROFILE } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoPath = path.join(process.cwd(), "public/brand/logo-square.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <img src={logoSrc} width={220} height={220} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 64, color: "#ffffff", fontWeight: 600, letterSpacing: -1 }}>
              {PROFILE.name}
            </div>
            <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 640 }}>
              Software engineer building AI-powered products
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

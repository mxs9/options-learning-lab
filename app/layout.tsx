import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const description = "通过系统课程、情景训练与历史行情回放，建立期权策略与风险管理能力。";
  return {
    title: "期权研习社｜从零到实战",
    description,
    icons: { icon: "/favicon.svg" },
    openGraph: { title: "期权研习社", description, images: [{ url: image, width: 1672, height: 941 }] },
    twitter: { card: "summary_large_image", title: "期权研习社", description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

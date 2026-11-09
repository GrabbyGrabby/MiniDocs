import GrabMailsLoginCard from "@/components/auth/GrabMailsLoginCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrabMails — Workspace Login & Onboarding",
  description: "Create your GrabMails workspace and start verifying business contacts.",
};

export default function GrabMailsPage() {
  return <GrabMailsLoginCard />;
}

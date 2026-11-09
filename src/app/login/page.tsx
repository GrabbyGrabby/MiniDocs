import GrabMailsLoginCard from "@/components/auth/GrabMailsLoginCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrabMails — Sign in to your workspace",
  description:
    "Log in or create a workspace on GrabMails. Verified B2B contact lists, lead validation, and high-deliverability outreach.",
};

export default function LoginPage() {
  return <GrabMailsLoginCard />;
}

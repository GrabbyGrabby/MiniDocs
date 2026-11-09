"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Building2, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

type AuthMode = "login" | "signup";

export default function GrabMailsLoginCard() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [workspaceName, setWorkspaceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companySize, setCompanySize] = useState("Just me");
  const [submitted, setSubmitted] = useState(false);

  const companySizes = ["Just me", "2-10", "11-50", "51-200", "201-1,000", "1,000+"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#F0E7D5] flex flex-col lg:flex-row select-none">
      {/* LEFT COLUMN: Modern Auth & Workspace Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 z-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#000000]">
        {/* Top Brand Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#F0E7D5] text-[#000000] flex items-center justify-center font-normal text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4 text-black" />
            </div>
            <span className="text-base font-light tracking-tight text-[#F0E7D5]">
              GrabMails<span className="text-xs align-super opacity-70">™</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-light text-[#F0E7D5]/60 hover:text-[#F0E7D5] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Center Form Container */}
        <div className="w-full max-w-md mx-auto my-10 space-y-6">
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              {mode === "signup" ? "Create a workspace" : "Welcome back"}
            </h1>
            <p className="text-xs sm:text-sm text-[#F0E7D5]/70 font-light leading-relaxed">
              {mode === "signup"
                ? "Prospects, verified email lists, and campaigns all live inside one workspace."
                : "Sign in to access your verified prospect lists and active outreach pipelines."}
            </p>
          </div>

          {/* Social SSO Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-normal text-white transition-all cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-normal text-white transition-all cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[11px] font-light text-white/40 uppercase tracking-widest">
              or continue with email
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-light text-white/80 block">Workspace name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-[#0a0a0c] text-white border border-white/15 focus:border-[#F0E7D5] rounded-xl px-4 py-3 text-sm font-light placeholder:text-white/30 outline-none transition-colors"
                  />
                  <Building2 className="w-4 h-4 text-white/30 absolute right-3.5 top-3.5" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-light text-white/80 block">Work email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#0a0a0c] text-white border border-white/15 focus:border-[#F0E7D5] rounded-xl px-4 py-3 text-sm font-light placeholder:text-white/30 outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-white/30 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-light text-white/80 block">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-[11px] font-light text-[#D4BCC8] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0a0a0c] text-white border border-white/15 focus:border-[#F0E7D5] rounded-xl px-4 py-3 text-sm font-light placeholder:text-white/30 outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-white/30 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Company Size Grid (Matches Reference Image 2) */}
            {mode === "signup" && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-light text-white/80 block">Company size</label>
                  <span className="text-[10px] font-light text-white/40 uppercase tracking-wider">
                    OPTIONAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {companySizes.map((size) => {
                    const active = companySize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setCompanySize(size)}
                        className={`py-2 px-2 text-xs rounded-xl font-normal transition-all cursor-pointer text-center ${
                          active
                            ? "border border-[#2563eb] bg-[#1d4ed8]/20 text-white shadow-sm"
                            : "border border-white/10 bg-[#0a0a0c] text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Primary Submit Button (From Image 2: Curved Deep Blue Pill) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-normal transition-all cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <span>{mode === "signup" ? "Create workspace" : "Sign in to GrabMails"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Submitted notification toast */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-xs font-light text-[#F0E7D5] flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8CE8B2] shrink-0" />
                <span>
                  Welcome to GrabMails! Verification link sent to <strong className="font-normal">{email || "your email"}</strong>.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode Switcher */}
          <div className="text-center text-xs text-[#F0E7D5]/60 font-light pt-2">
            {mode === "signup" ? (
              <p>
                Already have a GrabMails workspace?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("login"); setSubmitted(false); }}
                  className="text-white hover:underline font-normal cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have a workspace yet?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("signup"); setSubmitted(false); }}
                  className="text-white hover:underline font-normal cursor-pointer"
                >
                  Create workspace
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-between text-[11px] text-[#F0E7D5]/40 font-light pt-6 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4BCC8]" /> 256-bit AES encryption
          </span>
          <span>© {new Date().getFullYear()} GrabMails Inc.</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Atmospheric Visual Proof (Matches Reference Image 2) */}
      <div className="w-full lg:w-1/2 min-h-screen relative overflow-hidden flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#0c0d18] via-[#050608] to-[#020204]">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-[#2563eb]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-10 w-96 h-96 bg-[#8CE8B2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-6 relative z-10">
          {/* Overlapping Avatar Cluster (From Reference Image 2) */}
          <div className="flex items-center justify-center -space-x-3 mb-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-black object-cover shadow"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-black object-cover shadow"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-black object-cover shadow"
            />
          </div>

          {/* The White Testimonial Card (Exact UI Pattern from Reference Image 2) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FFFFFF] text-[#000000] rounded-[28px] p-7 sm:p-8 space-y-6 shadow-2xl border border-white/20"
          >
            <p className="text-base sm:text-lg font-light leading-relaxed text-[#111111]">
              &ldquo;GrabMails let us scale outbound revenue without losing deliverability or spending hours validating contact lists.&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Max Peters"
                className="w-10 h-10 rounded-full object-cover border border-black/10"
              />
              <div>
                <span className="text-sm font-normal text-black block leading-tight">
                  Max Peters
                </span>
                <span className="text-xs font-light text-black/60 block">
                  Founder, Adapta Growth
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating Metric Capsules (Exact UI Pattern from Reference Image 2) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-light border border-white/15 backdrop-blur-md">
              10M+ emails verified
            </span>
            <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-light border border-white/15 backdrop-blur-md">
              &lt;150ms p95 recall
            </span>
            <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full font-light border border-white/15 backdrop-blur-md">
              99.2% inbox rate
            </span>
          </div>

          {/* Reference Image 1 CTA Language: Dual Dashboard + Product Demo Pills */}
          <div className="pt-6 border-t border-white/10 text-center space-y-3">
            <span className="text-[11px] font-light text-white/50 uppercase tracking-widest block">
              Want a live interactive walkthrough?
            </span>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/home"
                className="px-5 py-2 rounded-full bg-[#000000] border border-white/20 hover:border-white/40 text-white text-xs font-normal transition-all"
              >
                Dashboard
              </Link>
              <Link
                href="#demo"
                className="px-5 py-2 rounded-full bg-[#bbf43d] hover:bg-[#a6e22e] text-black text-xs font-normal transition-all shadow-sm"
                style={{ backgroundColor: "oklch(87.1% 0.15 154.449)" }}
              >
                Product Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

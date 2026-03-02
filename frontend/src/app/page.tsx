"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, FileText, Lock, BarChart3 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1829] text-white overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg, #D4A017 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold accent line top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent z-50" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#1E2F5C] border border-[#D4A017]/30">
            <ShieldCheck className="size-5 text-[#D4A017]" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Pactura</span>
        </div>
        <button
          onClick={() => router.push("/sign-in")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#D4A017] border border-[#D4A017]/40 rounded-lg hover:bg-[#D4A017]/10 transition-colors"
        >
          Sign In
          <ArrowRight className="size-4" />
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div
          className="max-w-3xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4A017]/30 bg-[#D4A017]/10 text-[#D4A017] text-xs font-medium tracking-wider uppercase mb-8">
            <span className="size-1.5 rounded-full bg-[#D4A017] animate-pulse" />
            Document Governance Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            When the auditor walks in,{" "}
            <span className="text-[#D4A017]">
              will your documents tell the right story?
            </span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            Pactura gives federal contractors, legal teams, and compliance officers
            a single source of truth for every document — with the audit trail to prove it.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/sign-in")}
              className="flex items-center gap-2 px-6 py-3 bg-[#D4A017] text-[#0f1829] font-semibold rounded-lg hover:bg-[#D4A017]/90 transition-colors"
            >
              Access Demo
              <ArrowRight className="size-4" />
            </button>
            <span className="text-sm text-white/40">
              No setup required
            </span>
          </div>
        </div>

        {/* Feature cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {[
            {
              icon: FileText,
              title: "Document Control",
              description: "Every version, every access, every change — tracked automatically.",
            },
            {
              icon: Lock,
              title: "Role-Based Access",
              description: "The wrong person never accesses the wrong document again.",
            },
            {
              icon: BarChart3,
              title: "Audit Readiness",
              description: "One-click compliance reports when the auditor walks in the door.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-[#D4A017]/30 hover:bg-white/[0.05] transition-all"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#1E2F5C] border border-[#D4A017]/20 mb-4">
                <feature.icon className="size-5 text-[#D4A017]" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Second fear motivator */}
        <div
          className="mt-16 p-8 rounded-xl border border-[#D4A017]/20 bg-[#D4A017]/5"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p className="text-xl font-medium text-white/80"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            "When the wrong person accesses the wrong document,{" "}
            <span className="text-[#D4A017]">will you even know?</span>"
          </p>
          <p className="mt-3 text-sm text-white/40">
            Pactura logs every access event in real time — so you always know who saw what, and when.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xs text-white/30">© 2026 Aurum Equity LLC. All rights reserved.</span>
        <span className="text-xs text-white/30">Pactura by Aurum Equity</span>
      </footer>
    </div>
  );
}

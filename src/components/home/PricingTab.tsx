"use client";

export default function PricingTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-light text-[#F0E7D5] tracking-tight">
          Simple Plans
        </h2>
        <p className="text-xs text-[#D4BCC8]/70 font-light">
          Start free or unlock lifetime access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch pt-2">
        {/* Free Plan */}
        <div className="bg-[#141416] text-[#F0E7D5] border border-[#D4BCC8]/20 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-normal text-white">Free Plan</h3>
              <p className="text-xs text-[#D4BCC8]/70 mt-1 font-light">50 MB free lifetime browser memory quota.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-none">
                $0
              </span>
              <span className="text-xs text-[#D4BCC8]/70 font-light uppercase tracking-wider">forever</span>
            </div>
            <button
              disabled
              className="w-full py-2 px-4 rounded-full border border-white/10 text-[#D4BCC8]/70 text-xs font-light uppercase tracking-wider text-center cursor-default bg-white/5"
            >
              Current Plan
            </button>
            <div className="h-px w-full bg-white/10" />
            <ul className="space-y-2.5 text-xs text-[#F0E7D5]/70 font-light">
              <li className="flex items-center gap-2">✓ 50 MB local browser memory</li>
              <li className="flex items-center gap-2">✓ Instant image compression (WebP / JPG / PNG)</li>
              <li className="flex items-center gap-2">✓ Client-side video optimization (H.264)</li>
              <li className="flex items-center gap-2">✓ 100% private: zero server logs</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#F0E7D5] text-black rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-sm border border-[#D4BCC8]/30">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-normal tracking-tight">MiniDocs Pro</h3>
                <span className="text-[10px] font-light uppercase tracking-wider text-[#F0E7D5] bg-black px-2.5 py-0.5 rounded-full">
                  LIFETIME
                </span>
              </div>
              <p className="text-xs text-black/70 font-light mt-1">Pay once. Unlimited access forever.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-normal tracking-tight leading-none">
                $6.90
              </span>
              <span className="text-xs font-light uppercase tracking-wider text-black/60">one-time</span>
            </div>
            <button
              onClick={() => alert("Stripe checkout sandbox")}
              className="w-full py-2 px-4 rounded-full bg-black text-[#F0E7D5] hover:bg-[#141416] text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Upgrade to Lifetime Pro
            </button>
            <div className="h-px w-full bg-black/10" />
            <ul className="space-y-2.5 text-xs font-normal text-black/80">
              <li className="flex items-center gap-2">★ Unlimited in-browser processing</li>
              <li className="flex items-center gap-2">★ Unlimited batch sizes &amp; fast multi-threading</li>
              <li className="flex items-center gap-2">★ Unlimited video &amp; image exports</li>
              <li className="flex items-center gap-2">★ No monthly subscriptions ever</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function PricingTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Simple plans. No surprises.
        </h2>
        <p className="text-xs sm:text-sm text-[#535B74] dark:text-[#D4BCC8] font-light">
          Start with 50 MB free processing or unlock lifetime unlimited access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch pt-2">
        {/* Free Plan */}
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[32px] p-7 sm:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-normal text-white">Free Plan</h3>
              <p className="text-xs text-[#D4BCC8]/80 mt-1 font-light">50 MB free lifetime browser memory quota.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-none">
                $0
              </span>
              <span className="text-xs text-[#D4BCC8] font-light uppercase tracking-wider">forever</span>
            </div>
            <button
              disabled
              className="w-full py-2.5 px-6 rounded-full border border-white/20 text-[#D4BCC8] text-xs font-normal uppercase tracking-wider text-center cursor-default bg-white/5"
            >
              Current Plan
            </button>
            <div className="h-px w-full bg-white/10" />
            <ul className="space-y-3 text-xs text-[#F0E7D5]/80 font-light">
              <li className="flex items-center gap-2.5">✓ 50 MB local browser memory</li>
              <li className="flex items-center gap-2.5">✓ Instant image compression (WebP / JPG / PNG)</li>
              <li className="flex items-center gap-2.5">✓ Client-side video optimization (H.264)</li>
              <li className="flex items-center gap-2.5">✓ 100% private: zero server logs</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#D4BCC8] text-[#17191D] rounded-[32px] p-7 sm:p-8 flex flex-col justify-between shadow-sm border border-white/30">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium tracking-tight">MiniDocs Pro</h3>
                <span className="text-[10px] font-normal uppercase tracking-wider text-[#F0E7D5] bg-[#212842] px-2.5 py-0.5 rounded-full">
                  LIFETIME
                </span>
              </div>
              <p className="text-xs text-[#17191D]/75 font-normal mt-1">Pay once. Unlimited access forever.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-medium tracking-tight leading-none">
                $6.90
              </span>
              <span className="text-xs font-normal uppercase tracking-wider text-[#17191D]/70">one-time</span>
            </div>
            <button
              onClick={() => alert("Stripe checkout sandbox")}
              className="w-full py-2.5 px-6 rounded-full bg-[#212842] hover:bg-[#17191D] text-[#F0E7D5] text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Upgrade to Lifetime Pro
            </button>
            <div className="h-px w-full bg-[#17191D]/15" />
            <ul className="space-y-3 text-xs font-normal text-[#17191D]">
              <li className="flex items-center gap-2.5">★ Unlimited in-browser processing</li>
              <li className="flex items-center gap-2.5">★ Unlimited batch sizes &amp; fast multi-threading</li>
              <li className="flex items-center gap-2.5">★ Unlimited video &amp; image exports</li>
              <li className="flex items-center gap-2.5">★ No monthly subscriptions ever</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function PricingTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Simple pricing. No surprises.
        </h2>
        <p className="text-sm text-[#535B74] dark:text-[#D4BCC8] font-medium">
          Start with 50 MB free processing or unlock lifetime unlimited access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
        {/* Free Plan */}
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[42px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-white">Free Plan</h3>
              <p className="text-xs text-[#D4BCC8] mt-1">50 MB free lifetime browser memory quota.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                $0
              </span>
              <span className="text-xs text-[#D4BCC8] font-bold uppercase tracking-wider">forever</span>
            </div>
            <button
              disabled
              className="w-full py-3.5 px-6 rounded-full border border-white/20 text-[#D4BCC8] text-xs font-bold uppercase tracking-wider text-center cursor-default bg-white/5"
            >
              Current Plan
            </button>
            <div className="h-px w-full bg-white/10" />
            <ul className="space-y-3.5 text-xs text-[#F0E7D5]/80 font-medium">
              <li className="flex items-center gap-3">✓ 50 MB local browser memory</li>
              <li className="flex items-center gap-3">✓ Instant image compression (WebP / JPG / PNG)</li>
              <li className="flex items-center gap-3">✓ Client-side video optimization (H.264)</li>
              <li className="flex items-center gap-3">✓ 100% private: zero server logs</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#D4BCC8] text-[#17191D] rounded-[42px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative border-4 border-white/40">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tight">MiniDocs Pro</h3>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F0E7D5] bg-[#212842] px-3 py-1 rounded-full shadow-xs">
                  LIFETIME
                </span>
              </div>
              <p className="text-xs text-[#17191D]/80 font-bold mt-1">Pay once. Unlimited access forever.</p>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                $6.90
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#17191D]/70">one-time</span>
            </div>
            <button
              onClick={() => alert("Stripe checkout sandbox")}
              className="w-full py-3.5 px-6 rounded-full bg-[#212842] hover:bg-[#17191D] text-[#F0E7D5] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
            >
              Upgrade to Lifetime Pro
            </button>
            <div className="h-px w-full bg-[#17191D]/15" />
            <ul className="space-y-3.5 text-xs font-bold text-[#17191D]">
              <li className="flex items-center gap-3">★ Unlimited in-browser processing</li>
              <li className="flex items-center gap-3">★ Unlimited batch sizes &amp; fast multi-thread WASM</li>
              <li className="flex items-center gap-3">★ Unlimited video &amp; image exports</li>
              <li className="flex items-center gap-3">★ No monthly subscriptions ever</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

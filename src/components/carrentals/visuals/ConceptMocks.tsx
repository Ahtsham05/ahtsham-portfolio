import { Calendar, Check, MapPin, Search, Star } from "lucide-react";
import { VehicleArt } from "./VehicleArt";

/** Three homepage concepts in distinct visual languages. Placeholder brand only. */

function Browser({ children, light, url }: { children: React.ReactNode; light?: boolean; url: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border ${light ? "border-black/10 bg-[#f3f4f1]" : "border-white/10 bg-[#060706]"}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2 ${light ? "border-b border-black/5 bg-white" : "border-b border-white/5 bg-white/[0.03]"}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`size-1.5 rounded-full ${light ? "bg-black/15" : "bg-white/15"}`} />
        ))}
        <span className={`mx-auto rounded-full px-3 py-0.5 font-mono text-[0.5rem] ${light ? "bg-black/[0.04] text-black/40" : "bg-white/[0.05] text-white/35"}`}>{url}</span>
      </div>
      <div className="relative aspect-[16/11] overflow-hidden">{children}</div>
    </div>
  );
}

export function LuxuryMock() {
  return (
    <Browser url="yourbrand.com">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgb(236_238_233/0.10),transparent_55%),linear-gradient(180deg,#050505,#0c0c0c)]" />
      <div className="relative flex h-full flex-col p-[5%]">
        <div className="flex items-center justify-between text-[0.45rem] tracking-[0.3em] text-white/70">
          <span className="font-semibold">YOUR BRAND</span>
          <span className="hidden gap-3 sm:flex">
            <span>COLLECTION</span>
            <span>CONCIERGE</span>
          </span>
          <span className="rounded-full border border-white/30 px-2 py-0.5 text-[0.4rem]">RESERVE</span>
        </div>
        <p className="mt-[8%] font-serif text-[clamp(0.9rem,2.2vw,1.5rem)] italic leading-none text-silver">The art of arrival.</p>
        <p className="mt-1.5 max-w-[45%] text-[0.45rem] leading-relaxed text-white/45">Chauffeur and self-drive luxury, delivered wherever you land.</p>
        <div className="absolute bottom-[6%] right-[-4%] w-[78%]">
          <VehicleArt shape="sedan" tone="silver" lights reflection className="w-full overflow-visible" />
        </div>
        <div className="mt-auto flex gap-3 text-[0.4rem] tracking-[0.2em] text-white/40">
          <span>S-CLASS</span>
          <span>7 SERIES</span>
          <span>ESCALADE</span>
        </div>
      </div>
    </Browser>
  );
}

export function LocalMock() {
  return (
    <Browser light url="yourbrand.com">
      <div className="flex h-full flex-col p-[5%] text-[#101311]">
        <div className="flex items-center justify-between text-[0.45rem]">
          <span className="font-semibold tracking-[0.15em]">YOUR BRAND</span>
          <span className="flex items-center gap-1 text-black/50">
            <Star className="size-2 fill-current" /> Local &amp; family-run
          </span>
          <span className="rounded-full bg-[#101311] px-2 py-0.5 text-white">Call now</span>
        </div>
        <div className="mt-[5%] grid flex-1 grid-cols-[1.1fr_1fr] gap-[4%]">
          <div>
            <p className="text-[clamp(0.8rem,1.9vw,1.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Reliable cars from <span className="text-[#0e9f67]">$39/day</span>
            </p>
            <div className="mt-2 space-y-1 rounded-lg bg-white p-1.5 shadow-[0_6px_20px_-8px_rgb(0_0_0/0.25)]">
              <p className="flex items-center gap-1 rounded bg-black/[0.04] px-1.5 py-1 text-[0.4rem] text-black/60">
                <MapPin className="size-2" /> City Centre
              </p>
              <p className="flex items-center gap-1 rounded bg-black/[0.04] px-1.5 py-1 text-[0.4rem] text-black/60">
                <Calendar className="size-2" /> Pick dates
              </p>
              <p className="flex items-center justify-center gap-1 rounded bg-[#0e9f67] py-1 text-[0.45rem] font-medium text-white">
                <Search className="size-2" /> Find a car
              </p>
            </div>
          </div>
          <div className="relative self-center">
            <VehicleArt shape="suv" className="w-full overflow-visible" />
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-black/5 pt-2 text-[0.4rem] text-black/55">
          {["Free cancellation", "No hidden fees", "24/7 support"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <Check className="size-2 text-[#0e9f67]" /> {t}
            </span>
          ))}
        </div>
      </div>
    </Browser>
  );
}

export function ExoticMock() {
  return (
    <Browser url="yourbrand.com">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgb(143_107_255/0.35),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgb(62_230_160/0.25),transparent_55%),#07060c]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(100deg,transparent_0_22px,rgb(255_255_255/0.025)_22px_23px)]" />
      <div className="relative flex h-full flex-col p-[5%]">
        <div className="flex items-center justify-between text-[0.45rem] font-semibold tracking-[0.2em] text-white/80">
          <span>YOUR BRAND</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[0.4rem] text-black">BOOK NOW</span>
        </div>
        <p className="mt-[4%] text-[clamp(1.5rem,4.6vw,3rem)] font-black uppercase italic leading-[0.85] tracking-[-0.05em] text-white">
          Unleash
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.6)]">the drive.</span>
        </p>
        <div className="absolute bottom-[4%] right-[-6%] w-[82%]">
          <VehicleArt shape="supercar" lights reflection className="w-full overflow-visible" />
        </div>
        <div className="mt-auto flex gap-1.5">
          {["V10", "2 SEATS", "$1,450/DAY"].map((t) => (
            <span key={t} className="rounded-full border border-white/20 bg-black/40 px-1.5 py-0.5 font-mono text-[0.375rem] text-white/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Browser>
  );
}

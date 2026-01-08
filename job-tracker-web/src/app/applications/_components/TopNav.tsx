import Link from "next/link";
import { BriefcaseBusiness, Search } from "lucide-react";

export default function TopNav() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/applications" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white">
            <BriefcaseBusiness className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-zinc-900">
            Job Application Tracker
          </span>
        </Link>

        <div className="relative w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            placeholder="Search"
            className="w-full rounded-full border bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none ring-0 focus:border-zinc-300"
          />
        </div>
      </div>
    </header>
  );
}

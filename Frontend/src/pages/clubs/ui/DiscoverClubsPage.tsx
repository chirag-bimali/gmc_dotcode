import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ChevronDown, Code, Bot, Camera, Brain, MessageCircle, Music, Gamepad2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Club } from "@features/clubs/api/clubs";
import { useClubs } from "../model/useClubs";

const categories = ["All", "Technology", "AI", "Sports", "Music", "Photography", "Debate", "Robotics"];

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  smart_toy: Bot,
  photo_camera: Camera,
  psychology: Brain,
  forum: MessageCircle,
  music_note: Music,
  sports_esports: Gamepad2,
  trending_up: TrendingUp,
};

export function DiscoverClubsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");

  const { data: clubs, isLoading } = useClubs({
    search,
    category: activeCategory === "All" ? undefined : activeCategory,
    sort,
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <header>
        <h2 className="text-3xl font-semibold tracking-tight text-black">Discover Clubs</h2>
        <p className="text-base text-neutral-500 mt-1">Find communities that match your interests.</p>
      </header>

      {/* Controls */}
      <section className="space-y-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clubs..."
            className="w-full h-14 pl-12 pr-6 bg-white border border-neutral-200 rounded-lg text-sm shadow-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          />
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 min-w-fit">
            <span className="text-[13px] font-medium text-neutral-500">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-neutral-200 rounded-lg pl-3 pr-8 py-2 text-[13px] font-medium focus:ring-1 focus:ring-black focus:border-black outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="members">Member Count</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden animate-pulse">
              <div className="h-40 bg-neutral-100" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-neutral-100 rounded w-2/3" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
                <div className="h-10 bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clubs?.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="pt-8 text-center pb-4">
        <button className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 rounded-lg text-[13px] font-medium text-neutral-500 hover:bg-neutral-50 transition-colors">
          Load More Clubs
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ClubCard({ club }: { club: Club }) {
  const Icon = iconMap[club.icon] ?? Code;
  const isPrivate = club.privacy === "private";
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate({ to: "/clubs/$clubId", params: { clubId: club.id } })}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-200 flex flex-col hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      {/* Cover image */}
      <div className="relative h-40">
        <div
          className="w-full h-full bg-cover bg-center bg-neutral-200 transition-transform duration-500 group-hover:scale-105"
          style={club.coverImage ? { backgroundImage: `url('${club.coverImage}')` } : undefined}
        />
        {/* Club icon */}
        <div className="absolute -bottom-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-black text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        {/* Privacy badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider text-black border border-neutral-100">
          {club.privacy}
        </div>
      </div>

      {/* Content */}
      <div className="pt-8 px-5 pb-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-black">{club.name}</h3>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded text-[11px] font-semibold">
            {club.category}
          </span>
          <span className="text-neutral-300 text-[11px]">&bull;</span>
          <span className="text-neutral-500 text-[11px]">
            {club.memberCount >= 1000
              ? `${(club.memberCount / 1000).toFixed(1)}k`
              : club.memberCount}{" "}
            members
          </span>
        </div>

        <p className="text-sm text-neutral-500 line-clamp-2 mb-5 flex-1">
          {club.description}
        </p>

        <button
          className={`w-full py-3 rounded-lg text-[13px] font-medium transition-colors ${
            isPrivate
              ? "bg-neutral-100 text-black hover:bg-neutral-200"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {isPrivate ? "Request to Join" : "Join"}
        </button>
      </div>
    </article>
  );
}

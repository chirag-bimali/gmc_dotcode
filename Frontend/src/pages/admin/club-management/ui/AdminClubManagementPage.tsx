import {
  Archive,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Globe,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

type ClubStatus = "active" | "pending" | "archived";

type ClubCard = {
  name: string;
  category: string;
  status: ClubStatus;
  members: number;
  visibility: "Public" | "Private";
  events: number;
  manager: string;
  icon: typeof Building2;
};

const clubs: ClubCard[] = [
  {
    name: "Dev Collective",
    category: "Technology",
    status: "active",
    members: 412,
    visibility: "Public",
    events: 12,
    manager: "Alex Chen",
    icon: Building2,
  },
  {
    name: "Fine Arts Soc",
    category: "Arts",
    status: "pending",
    members: 24,
    visibility: "Private",
    events: 0,
    manager: "Sarah Jenkins",
    icon: Sparkles,
  },
  {
    name: "Retro Gaming",
    category: "Leisure",
    status: "archived",
    members: 156,
    visibility: "Public",
    events: 0,
    manager: "Marcus Thorne",
    icon: Archive,
  },
  {
    name: "Powerlift Club",
    category: "Sports",
    status: "active",
    members: 89,
    visibility: "Public",
    events: 4,
    manager: "Diana Prince",
    icon: Users,
  },
  {
    name: "Drama Guild",
    category: "Arts",
    status: "active",
    members: 210,
    visibility: "Public",
    events: 8,
    manager: "Leo Banks",
    icon: BadgeCheck,
  },
];

const statusStyles: Record<ClubStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  archived: "bg-neutral-100 text-neutral-500",
};

const statusLabels: Record<ClubStatus, string> = {
  active: "Active",
  pending: "Pending",
  archived: "Archived",
};

const quickStats = [
  { label: "Total Clubs", value: "24", note: "+3 this month" },
  { label: "Pending Review", value: "5", note: "Needs approval" },
  { label: "Active Events", value: "18", note: "Across all clubs" },
  { label: "Verified Clubs", value: "19", note: "Identity checked" },
];

export function AdminClubManagementPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <nav className="mb-2 flex items-center gap-1 text-xs text-neutral-500">
            <span>Admin</span>
            <span className="text-[10px]">&rsaquo;</span>
            <span className="font-semibold text-black">Club Management</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold text-black">Manage Clubs</h2>
            <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-bold text-white">
              24 TOTAL
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Create, verify, and manage clubs across the university from one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 rounded bg-neutral-100 px-4 py-2.5 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-200">
            <Download className="h-4 w-4" />
            Export List
          </button>
          <button className="flex items-center gap-1.5 rounded bg-black px-4 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" />
            Create Club
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="text-[13px] text-neutral-500">{stat.label}</div>
            <div className="mt-2 text-2xl font-bold text-black">{stat.value}</div>
            <div className="mt-1 text-xs text-neutral-500">{stat.note}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 bg-neutral-50/60 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search clubs, categories, or admins..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none">
                <option>All Categories</option>
                <option>Academic</option>
                <option>Sports</option>
                <option>Arts</option>
                <option>Technology</option>
              </select>
              <select className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Archived</option>
              </select>
              <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
                <Filter className="h-4 w-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => {
            const Icon = club.icon;

            return (
              <article
                key={club.name}
                className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="max-w-[180px] truncate text-base font-bold text-black">{club.name}</h3>
                      <p className="text-sm text-neutral-500">{club.category}</p>
                    </div>
                  </div>
                  <span className={`rounded px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${statusStyles[club.status]}`}>
                    {statusLabels[club.status]}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-y border-neutral-100 py-4 text-neutral-600">
                  <div className="flex flex-col items-center text-center">
                    <Users className="mb-1.5 h-4 w-4" />
                    <span className="text-xs font-semibold">{club.members}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Globe className="mb-1.5 h-4 w-4" />
                    <span className="text-xs font-semibold">{club.visibility}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <BadgeCheck className="mb-1.5 h-4 w-4" />
                    <span className="text-xs font-semibold">{club.events}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-700">
                    {club.manager.charAt(0)}
                  </div>
                  <span>Managed by {club.manager}</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold transition-colors hover:bg-neutral-50">
                    View
                  </button>
                  <button className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold transition-colors hover:bg-neutral-50">
                    {club.status === "pending" ? "Verify" : club.status === "archived" ? "Restore" : "Archive"}
                  </button>
                  <button className="rounded-lg border border-neutral-200 p-2 transition-colors hover:bg-neutral-50">
                    <MoreVertical className="h-4 w-4 text-neutral-600" />
                  </button>
                </div>
              </article>
            );
          })}

          <button className="flex min-h-[268px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 p-5 text-neutral-400 transition-all duration-200 hover:border-black hover:text-black">
            <Plus className="mb-3 h-12 w-12 transition-transform group-hover:scale-110" />
            <span className="text-base font-bold">Register New Club</span>
            <span className="mt-1 text-sm">Add a new student organization</span>
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50/60 px-4 py-3">
          <span className="text-xs text-neutral-500">
            Showing <span className="font-bold text-black">1 - 6</span> of 24 clubs
          </span>
          <div className="flex items-center gap-1">
            <button className="rounded border border-neutral-200 p-1.5 text-neutral-400 transition-colors hover:bg-white disabled:opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-black text-[13px] font-medium text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-transparent text-[13px] transition-colors hover:border-neutral-200 hover:bg-white">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-transparent text-[13px] transition-colors hover:border-neutral-200 hover:bg-white">
              3
            </button>
            <span className="px-1 text-neutral-400">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-transparent text-[13px] transition-colors hover:border-neutral-200 hover:bg-white">
              8
            </button>
            <button className="rounded border border-neutral-200 p-1.5 text-neutral-500 transition-colors hover:bg-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
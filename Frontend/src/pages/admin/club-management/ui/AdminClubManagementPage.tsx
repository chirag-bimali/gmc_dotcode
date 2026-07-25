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
  Users,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useClubManagement, useClubManagementStats, useCreateClub } from "../model/useClubManagement";

type ClubStatus = "active" | "pending" | "archived";

type CreateClubForm = {
  name: string;
  category: string;
  status: ClubStatus;
  visibility: "Public" | "Private";
  description: string;
  manager: string;
  icon: string;
};

const iconMap: Record<string, typeof Building2> = {
  code: Building2,
  sparkle: BadgeCheck,
  archive: Archive,
  dumbbell: Users,
  theater: BadgeCheck,
};

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

const defaultCreateForm: CreateClubForm = {
  name: "",
  category: "Technology",
  status: "pending" as ClubStatus,
  visibility: "Public",
  description: "",
  manager: "",
  icon: "code",
};

export function AdminClubManagementPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateClubForm>(defaultCreateForm);

  const queryClient = useQueryClient();

  const { data: clubs, isLoading } = useClubManagement({ search, category, status });
  const { data: stats } = useClubManagementStats();
  const createMutation = useCreateClub();

  const openCreateModal = () => setCreateOpen(true);

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createMutation.mutateAsync({
      name: createForm.name.trim(),
      category: createForm.category,
      status: createForm.status,
      visibility: createForm.visibility,
      description: createForm.description.trim(),
      manager: createForm.manager.trim(),
      icon: createForm.icon,
    });

    await queryClient.invalidateQueries({ queryKey: ["admin-clubs"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-clubs-stats"] });
    setCreateOpen(false);
    setCreateForm(defaultCreateForm);
  };

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
              {stats?.total ?? "—"} TOTAL
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
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 rounded bg-black px-4 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Create Club
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Clubs" value={stats?.total ?? "—"} note="Managed across campus" />
        <StatCard label="Pending Review" value={stats?.pendingReview ?? "—"} note="Needs approval" />
        <StatCard label="Active Events" value={stats?.activeEvents ?? "—"} note="Across all clubs" />
        <StatCard label="Verified Clubs" value={stats?.verified ?? "—"} note="Identity checked" />
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 bg-neutral-50/60 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search clubs, categories, or admins..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
              >
                <option>All Categories</option>
                <option>Academic</option>
                <option>Sports</option>
                <option>Arts</option>
                <option>Technology</option>
              </select>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
              >
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
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-67 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100" />
            ))
          ) : (
            clubs?.map((club) => {
              const ClubIcon = iconMap[club.icon] ?? Building2;

              return (
              <article
                key={club.id}
                className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                      <ClubIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="max-w-44 truncate text-base font-bold text-black">{club.name}</h3>
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
                    <span className="text-xs font-semibold">{club.memberCount}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Globe className="mb-1.5 h-4 w-4" />
                    <span className="text-xs font-semibold">{club.visibility}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <BadgeCheck className="mb-1.5 h-4 w-4" />
                    <span className="text-xs font-semibold">{club.eventCount}</span>
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
            }))}

          <button
            onClick={openCreateModal}
            className="flex min-h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 p-5 text-neutral-400 transition-all duration-200 hover:border-black hover:text-black"
          >
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

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close create club modal"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCreateOpen(false)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-black">Create Club</h3>
                <p className="mt-1 text-sm text-neutral-500">Create a new club and sync it to the backend mock.</p>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                Close
              </button>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateSubmit}>
              <Field label="Club Name" className="md:col-span-2">
                <input
                  required
                  value={createForm.name}
                  onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. Innovation Club"
                />
              </Field>

              <Field label="Category">
                <select
                  value={createForm.category}
                  onChange={(event) => setCreateForm((current) => ({ ...current, category: event.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option>Technology</option>
                  <option>Academic</option>
                  <option>Sports</option>
                  <option>Arts</option>
                  <option>Leisure</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={createForm.status}
                  onChange={(event) => setCreateForm((current) => ({ ...current, status: event.target.value as ClubStatus }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>

              <Field label="Visibility">
                <select
                  value={createForm.visibility}
                  onChange={(event) => setCreateForm((current) => ({ ...current, visibility: event.target.value as "Public" | "Private" }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </Field>

              <Field label="Manager Name">
                <input
                  required
                  value={createForm.manager}
                  onChange={(event) => setCreateForm((current) => ({ ...current, manager: event.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. Alex Chen"
                />
              </Field>

              <Field label="Icon Key">
                <select
                  value={createForm.icon}
                  onChange={(event) => setCreateForm((current) => ({ ...current, icon: event.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="code">code</option>
                  <option value="sparkle">sparkle</option>
                  <option value="archive">archive</option>
                  <option value="dumbbell">dumbbell</option>
                  <option value="theater">theater</option>
                </select>
              </Field>

              <Field label="Description" className="md:col-span-2">
                <textarea
                  required
                  rows={4}
                  value={createForm.description}
                  onChange={(event) => setCreateForm((current) => ({ ...current, description: event.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="Describe the club mission, activities, and goals"
                />
              </Field>

              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {createMutation.isPending ? "Creating..." : "Create Club"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

function StatCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="text-[13px] text-neutral-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-black">{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{note}</div>
    </div>
  );
}
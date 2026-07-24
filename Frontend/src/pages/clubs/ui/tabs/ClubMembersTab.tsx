import { useState } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

type Member = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Moderator" | "Member";
  joined: string;
};

const members: Member[] = [
  { id: "m1", name: "Sarah Miller", email: "sarah.m@university.edu", role: "Admin", joined: "2 months ago" },
  { id: "m2", name: "Alex Thorne", email: "alex.t@university.edu", role: "Member", joined: "5 days ago" },
  { id: "m3", name: "Elena Rodriguez", email: "elena.r@university.edu", role: "Member", joined: "3 weeks ago" },
  { id: "m4", name: "David Park", email: "david.p@university.edu", role: "Member", joined: "1 month ago" },
  { id: "m5", name: "Priya Sharma", email: "priya.s@university.edu", role: "Moderator", joined: "1 month ago" },
  { id: "m6", name: "James Wilson", email: "james.w@university.edu", role: "Member", joined: "2 weeks ago" },
];

const roleBadgeClasses: Record<Member["role"], string> = {
  Admin: "bg-black text-white",
  Moderator: "bg-neutral-800 text-white",
  Member: "bg-neutral-100 text-neutral-700 border border-neutral-200",
};

export function ClubMembersTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-neutral-500">
            {filtered.length} member{filtered.length !== 1 && "s"}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-5 py-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-5 py-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-sm font-medium text-neutral-600">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-black">
                          {member.name}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${roleBadgeClasses[member.role]}`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-neutral-500">
                    {member.joined}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1 rounded-full hover:bg-neutral-200 text-neutral-400 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-neutral-200 flex items-center justify-between bg-neutral-50">
          <span className="text-xs text-neutral-500">
            Showing {filtered.length} of {members.length} members
          </span>
          <div className="flex gap-2">
            <button className="p-1.5 border border-neutral-200 rounded hover:bg-white transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 border border-neutral-200 rounded hover:bg-white transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

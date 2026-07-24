import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Users, MoreHorizontal, Terminal } from "lucide-react";
import { useClubDetails } from "../model/useClubDetails";
import { ClubAboutTab } from "./tabs/ClubAboutTab";
import { ClubFeedTab } from "./tabs/ClubFeedTab";
import { ClubEventsTab } from "./tabs/ClubEventsTab";
import { ClubMembersTab } from "./tabs/ClubMembersTab";

const tabs = ["About", "Feed", "Events", "Members"] as const;
type Tab = (typeof tabs)[number];

export function ClubDetailsPage() {
  const { clubId } = useParams({ from: "/_app/clubs_/$clubId" });
  const { data: club, isLoading } = useClubDetails(clubId);
  const [activeTab, setActiveTab] = useState<Tab>("About");

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-[200px] bg-neutral-200 rounded-xl" />
        <div className="h-8 bg-neutral-100 rounded w-1/3" />
        <div className="h-4 bg-neutral-100 rounded w-1/2" />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">Club not found.</p>
      </div>
    );
  }

  return (
    <div className="-mx-4 md:-mx-6 lg:-mx-8 -mt-4 md:-mt-6 lg:-mt-8">
      {/* Banner */}
      <div className="relative">
        <div className="w-full h-[200px] overflow-hidden bg-neutral-200">
          {club.coverImage && (
            <img
              src={club.coverImage}
              alt={club.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Club header */}
          <div className="relative flex flex-col md:flex-row md:items-end gap-4 -mt-10 mb-6">
            {/* Logo */}
            <div className="w-20 h-20 bg-white rounded-full p-1 shadow-sm">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Terminal className="h-9 w-9 text-white" />
              </div>
            </div>

            {/* Info & Actions */}
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 md:pt-0">
              <div>
                <h2 className="text-[30px] font-bold text-black">{club.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-bold uppercase tracking-tight text-neutral-500">
                    {club.category}
                  </span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-bold uppercase tracking-tight text-neutral-500">
                    {club.privacy}
                  </span>
                  <span className="text-xs text-neutral-500 flex items-center ml-2">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {club.memberCount >= 1000
                      ? `${(club.memberCount / 1000).toFixed(1)}k`
                      : club.memberCount}{" "}
                    members
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-black text-white px-6 py-2.5 rounded text-[13px] font-bold hover:opacity-90 transition-opacity shadow-sm">
                  Join Club
                </button>
                <button className="bg-neutral-100 text-neutral-800 px-4 py-2.5 rounded text-[13px] font-bold border border-neutral-200 hover:bg-neutral-200 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex gap-8 border-b border-neutral-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-black text-black font-bold"
                    : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {activeTab === "About" && <ClubAboutTab club={club} />}
        {activeTab === "Feed" && <ClubFeedTab />}
        {activeTab === "Events" && <ClubEventsTab />}
        {activeTab === "Members" && <ClubMembersTab />}
      </div>
    </div>
  );
}

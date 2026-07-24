import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Clock, Users, LayoutGrid, List } from "lucide-react";
import { useEvents } from "../model/useEvents";
import type { EventListItem } from "@features/events/api/events";

const filters = ["All Events", "My RSVPs", "This Week", "This Month"];

export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [sort, setSort] = useState("soonest");
  const navigate = useNavigate();

  const { data: events, isLoading } = useEvents({
    filter: activeFilter === "All Events" ? undefined : activeFilter,
    sort,
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page header */}
      <header>
        <h2 className="text-3xl font-semibold tracking-tight text-black">Events</h2>
        <p className="text-base text-neutral-500 mt-1">
          Upcoming events from your clubs and campus.
        </p>
      </header>

      {/* Filters & toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "bg-white border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort + view toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border-none text-[13px] font-medium text-black focus:ring-0 cursor-pointer pr-5"
            >
              <option value="soonest">Soonest First</option>
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          <div className="h-4 w-px bg-neutral-200" />
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            <button className="p-1 bg-white shadow-sm rounded-md text-black flex items-center justify-center">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="p-1 text-neutral-500 hover:text-black flex items-center justify-center transition-colors">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Event grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-neutral-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-neutral-100 rounded w-1/3" />
                <div className="h-5 bg-neutral-100 rounded w-2/3" />
                <div className="h-3 bg-neutral-100 rounded w-1/2" />
                <div className="h-10 bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => navigate({ to: "/events/$eventId", params: { eventId: event.id } })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, onClick }: { event: EventListItem; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      {/* Cover */}
      <div className="relative h-48 w-full bg-neutral-100 flex items-center justify-center">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-neutral-300 text-sm">Event cover</span>
        )}
        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-2 rounded-lg text-center leading-tight">
          <span className="block font-bold text-lg">{event.day}</span>
          <span className="block text-[10px] font-medium uppercase tracking-wider">
            {event.month}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Club */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-[10px] font-bold">{event.club.name.charAt(0)}</span>
          </div>
          <span className="text-[13px] text-neutral-500">{event.club.name}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-black group-hover:text-black transition-colors">
          {event.title}
        </h3>

        {/* Details */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-neutral-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Users className="h-4 w-4" />
            <span className="text-sm">{event.attendees} going</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-3">
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white py-2 rounded-lg text-[13px] font-medium hover:bg-neutral-800 transition-colors"
          >
            Going
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-100 text-neutral-500 py-2 rounded-lg text-[13px] font-medium hover:bg-neutral-200 transition-colors"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

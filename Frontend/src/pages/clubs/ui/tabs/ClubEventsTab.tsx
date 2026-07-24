import { useNavigate } from "@tanstack/react-router";
import { MapPin, Clock, Users } from "lucide-react";

const events = [
  {
    id: "evt_001",
    day: "24",
    month: "OCT",
    club: "Coding Club",
    title: "Winter Hackathon 2024",
    location: "Main Hall, Building A",
    time: "10:00 AM - 6:00 PM",
    attendees: 128,
  },
  {
    id: "evt_002",
    day: "28",
    month: "OCT",
    club: "Creative Arts Society",
    title: "Digital Design Expo",
    location: "Art Gallery, Level 2",
    time: "2:00 PM - 5:00 PM",
    attendees: 64,
  },
  {
    id: "evt_003",
    day: "02",
    month: "NOV",
    club: "Debate League",
    title: "Inter-Varsity Debate",
    location: "Lecture Theatre 4",
    time: "5:30 PM - 8:00 PM",
    attendees: 96,
  },
];

export function ClubEventsTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button className="px-4 py-1.5 bg-black text-white rounded-full text-[13px] font-medium whitespace-nowrap">
          All Events
        </button>
        <button className="px-4 py-1.5 bg-white border border-neutral-200 text-neutral-500 rounded-full text-[13px] font-medium whitespace-nowrap hover:bg-neutral-50 transition-colors">
          This Week
        </button>
        <button className="px-4 py-1.5 bg-white border border-neutral-200 text-neutral-500 rounded-full text-[13px] font-medium whitespace-nowrap hover:bg-neutral-50 transition-colors">
          This Month
        </button>
      </div>

      {/* Event cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate({ to: "/events/$eventId", params: { eventId: event.id } })}
            className="group bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            {/* Image area */}
            <div className="relative h-48 w-full bg-neutral-100 flex items-center justify-center">
              <span className="text-neutral-300 text-sm">Event cover</span>
              <div className="absolute top-3 right-3 bg-black text-white px-3 py-2 rounded-lg text-center leading-tight">
                <span className="block font-bold text-lg">{event.day}</span>
                <span className="block text-[10px] font-medium uppercase tracking-wider">
                  {event.month}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">C</span>
                </div>
                <span className="text-[13px] text-neutral-500">{event.club}</span>
              </div>

              <h3 className="text-lg font-semibold text-black">{event.title}</h3>

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

              <div className="grid grid-cols-2 gap-2 pt-3">
                <button className="bg-black text-white py-2 rounded-lg text-[13px] font-medium hover:bg-neutral-800 transition-colors">
                  Going
                </button>
                <button className="bg-neutral-100 text-neutral-500 py-2 rounded-lg text-[13px] font-medium hover:bg-neutral-200 transition-colors">
                  Interested
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

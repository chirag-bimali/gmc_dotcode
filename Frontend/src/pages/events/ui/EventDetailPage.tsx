import { useParams } from "@tanstack/react-router";
import { CheckCircle, Star, XCircle, MapPin, Mail, Share2, Bookmark, Users, CircleCheck } from "lucide-react";
import { useEventDetails } from "../model/useEventDetails";

export function EventDetailPage() {
  const { eventId } = useParams({ from: "/_app/events_/$eventId" });
  const { data: event, isLoading } = useEventDetails(eventId);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-[240px] bg-neutral-200 rounded-xl" />
        <div className="h-8 bg-neutral-100 rounded w-1/2" />
        <div className="h-4 bg-neutral-100 rounded w-1/3" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">Event not found.</p>
      </div>
    );
  }

  const capacityPercent = Math.round((event.registered / event.capacity) * 100);

  return (
    <div className="-mx-4 md:-mx-6 lg:-mx-8 -mt-4 md:-mt-6 lg:-mt-8">
      {/* Hero banner */}
      <section className="relative w-full h-[240px] overflow-hidden bg-neutral-200">
        <div className="absolute inset-0 bg-black/20 z-10" />
        {event.coverImage && (
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Floating date card */}
        <div className="absolute bottom-4 right-8 z-20 bg-white rounded-lg shadow-xl overflow-hidden w-20 flex flex-col items-center">
          <div className="bg-red-500 w-full py-1 text-center text-[10px] font-bold text-white uppercase tracking-wider">
            {event.month}
          </div>
          <div className="py-2 flex flex-col items-center">
            <span className="text-[30px] font-extrabold leading-none text-black">
              {event.day}
            </span>
            <span className="text-[10px] font-medium text-neutral-500 mt-1 uppercase">
              {event.weekday}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-8">
        {/* Event header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
                {event.status}
              </span>
              <div className="flex items-center gap-1">
                <Share2 className="h-3.5 w-3.5 text-neutral-500" />
                <button className="text-xs font-medium text-neutral-500 hover:text-black underline">
                  Share Event
                </button>
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-black mb-2">{event.title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold">C</span>
                </div>
                <span className="text-sm font-semibold text-black">
                  {event.club.name}
                </span>
              </div>
              <div className="w-px h-4 bg-neutral-300" />
              <div className="flex items-center gap-1 text-neutral-500">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-3 bg-black text-white rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-neutral-800 transition-all">
              <CircleCheck className="h-4 w-4" />
              Register Now
            </button>
            <button className="p-3 border border-neutral-200 rounded-lg text-neutral-500 hover:bg-neutral-50 transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4">About the Event</h3>
              <div className="text-base text-neutral-500 space-y-4">
                <p>{event.description}</p>
                {event.highlights.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {event.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Venue + Organizer grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Venue */}
              <div className="bg-white border border-neutral-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-black" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wide">Venue</h4>
                </div>
                <div className="h-32 bg-neutral-100 rounded-lg mb-3 flex items-center justify-center text-neutral-300 text-sm">
                  Map placeholder
                </div>
                <p className="text-sm font-semibold text-black">{event.location}</p>
                <p className="text-xs text-neutral-500">{event.address}</p>
              </div>

              {/* Organizer */}
              <div className="bg-white border border-neutral-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-black" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wide">Organizer</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-lg font-bold text-neutral-400 shrink-0">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{event.organizer.name}</p>
                    <p className="text-xs text-neutral-500">{event.organizer.role}</p>
                    <button className="mt-2 text-xs text-black hover:underline font-semibold flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4">
            {/* Capacity */}
            <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <h4 className="text-[13px] font-bold">Capacity</h4>
                <span className="text-xs text-neutral-500">
                  {event.registered} / {event.capacity} filled
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {capacityPercent >= 80 ? (
                  <>
                    <span className="text-emerald-500 font-bold">Almost full!</span>{" "}
                    Registration closes soon or when capacity is reached.
                  </>
                ) : (
                  "Spots are still available. Register now to secure your place."
                )}
              </p>
            </div>

            {/* RSVP */}
            <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
              <h4 className="text-[13px] font-bold mb-3">Manage RSVP</h4>
              <div className="flex flex-col gap-2">
                <button className="w-full py-3 px-4 bg-neutral-100 text-black font-bold rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Going</span>
                  </div>
                  <span className="text-neutral-400 text-sm">&rsaquo;</span>
                </button>
                <button className="w-full py-3 px-4 bg-white border border-neutral-200 text-neutral-500 font-medium rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span>Interested</span>
                </button>
                <button className="w-full py-3 px-4 bg-white border border-neutral-200 text-neutral-500 font-medium rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>Not Going</span>
                </button>
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
              <h4 className="text-[13px] font-bold mb-3">Attendees</h4>
              <div className="flex items-center -space-x-2 mb-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-neutral-500"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-500">
                  +{event.attendeeCount - 6}
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Including friends and {event.attendeeCount - 6} others.
              </p>
            </div>

            {/* Team matchmaking CTA */}
            <div className="bg-black p-5 rounded-lg text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[13px] font-bold mb-1">Join a Team</h4>
                <p className="text-xs text-neutral-400 mb-3">
                  Don't have a team yet? Join the matchmaking session.
                </p>
                <button className="text-[11px] font-bold text-white border-b border-white/40 pb-0.5 hover:border-white transition-all uppercase tracking-widest">
                  Team Matchmaking
                </button>
              </div>
              <Users className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

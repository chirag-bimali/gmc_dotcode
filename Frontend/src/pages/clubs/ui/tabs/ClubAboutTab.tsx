import type { ClubDetail } from "@features/clubs/api/clubDetails";

type Props = { club: ClubDetail };

export function ClubAboutTab({ club }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Left: About & Admins */}
      <div className="flex-1 space-y-10">
        <section>
          <h3 className="text-xl font-bold mb-4">About the Club</h3>
          <div className="max-w-[700px] space-y-4 text-neutral-500">
            <p className="text-base leading-relaxed">{club.about}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-4">Club Administrators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {club.admins.map((admin) => (
              <div
                key={admin.id}
                className="p-3 bg-white border border-neutral-200 rounded-lg shadow-sm flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-sm font-bold text-neutral-500">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-black">{admin.name}</p>
                  <p className="text-xs text-neutral-500">{admin.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right: Sidebar */}
      <div className="w-full md:w-80 space-y-6">
        {/* Upcoming events */}
        <section className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Upcoming Events</h3>
            <button className="text-xs font-bold text-black hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {club.upcomingEvents.map((event) => (
              <div key={event.id} className="group cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-neutral-50 rounded flex flex-col items-center justify-center shrink-0 border border-neutral-200 group-hover:border-black transition-colors">
                    <span className="text-[10px] font-bold uppercase text-neutral-500">
                      {event.month}
                    </span>
                    <span className="text-lg font-bold text-black leading-tight">
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-black">{event.title}</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">{event.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-neutral-100">
              <button className="w-full py-2 bg-neutral-50 border border-dashed border-neutral-300 rounded text-xs text-neutral-500 hover:bg-neutral-100 transition-colors">
                + Suggest an Event
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-neutral-50 rounded-lg p-5">
          <h4 className="text-[13px] font-bold text-black mb-3">Quick Stats</h4>
          <ul className="space-y-2">
            {club.stats.map((stat) => (
              <li key={stat.label} className="flex justify-between text-xs">
                <span className="text-neutral-500">{stat.label}</span>
                <span className="font-bold text-black">{stat.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

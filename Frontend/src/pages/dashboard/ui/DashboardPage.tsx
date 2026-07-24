import { TrendingUp } from "lucide-react";
import { useAuthStore } from "@shared/store/auth-store";

const events = [
  { month: "Oct", day: "24", title: "Robotics Club Annual Meet", time: "4:00 PM", location: "Engineering Block A" },
  { month: "Oct", day: "25", title: "Chess Tournament Qualifiers", time: "10:00 AM", location: "Student Union Hall" },
  { month: "Oct", day: "27", title: "Product Design Workshop", time: "2:30 PM", location: "Digital Arts Lab" },
];

const notifications = [
  { color: "bg-blue-500", text: 'New assignment for <strong>CS301</strong> posted.' },
  { color: "bg-amber-500", text: "Photography Club voting starts tonight." },
  { color: "bg-emerald-500", text: "Membership for 'Debate Hub' confirmed." },
];

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Welcome back, {user?.name?.split(" ")[0] ?? "Student"}
        </h1>
        <p className="text-base text-neutral-500 max-w-[700px]">
          You have 3 club meetings today and 2 new assignments due this week. Stay on top of your academic and social life.
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
        {/* Upcoming Events */}
        <div className="md:col-span-8 bg-white border border-neutral-200 rounded-xl p-5 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
            <button className="text-[13px] font-medium text-black hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-3 p-3 border border-neutral-100 rounded-lg hover:border-neutral-200 transition-colors group"
              >
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded border border-neutral-100 bg-neutral-50">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase">
                    {event.month}
                  </span>
                  <span className="text-lg font-black text-black">{event.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-black truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {event.time} &bull; {event.location}
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-black text-white px-3 py-1.5 rounded text-[12px] font-bold transition-all">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-4 space-y-4 lg:space-y-6">
          {/* Stat card */}
          <div className="bg-black text-white rounded-xl p-5 lg:p-6 shadow-sm">
            <p className="text-[13px] font-medium text-neutral-400">Club Participation</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-[32px] font-black">92%</span>
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-3">
              You are in the top 5% of active students this semester.
            </p>
          </div>

          {/* Quick notifications */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 lg:p-6 shadow-sm">
            <h3 className="text-[13px] font-bold mb-3">Quick Notifications</h3>
            <div className="space-y-2">
              {notifications.map((notif, i) => (
                <div key={i} className="flex gap-2">
                  <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${notif.color}`} />
                  <p
                    className="text-[12px] text-neutral-600"
                    dangerouslySetInnerHTML={{ __html: notif.text }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards row */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <FeatureCard
            title="Discover New Clubs"
            description="Explore 15 new clubs that matched your interests today."
          />
          <FeatureCard
            title="Campus Directory"
            description="Find building locations, labs, and office hours easily."
          />
          <FeatureCard
            title="My Schedule"
            description="Sync your classes and club events to your personal calendar."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
      <div className="h-32 w-full bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-300 text-sm">Image placeholder</span>
      </div>
      <div className="p-4">
        <h4 className="text-[13px] font-bold">{title}</h4>
        <p className="text-xs text-neutral-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

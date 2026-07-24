import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Compass,
  CalendarDays,
  Settings2,
  ArrowRight,
  Globe,
  Mail,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Students",
    description:
      "Only students invited by their university can access the platform, ensuring a safe, focused environment.",
  },
  {
    icon: Compass,
    title: "Discover Clubs",
    description:
      "Find communities that match your specific interests, academic goals, and hobbies effortlessly.",
  },
  {
    icon: CalendarDays,
    title: "Campus Events",
    description:
      "Sync campus-wide happenings directly to your dashboard. Never miss a talk, workshop, or social.",
  },
  {
    icon: Settings2,
    title: "University Managed",
    description:
      "Institutional admins maintain full oversight of clubs and content, ensuring policy compliance.",
  },
];

const steps = [
  {
    number: "01",
    title: "University Invites",
    description:
      "Your institution sends a secure invitation link to your official student email address.",
  },
  {
    number: "02",
    title: "Student Profile",
    description:
      "Claim your account and customize your profile with your major, interests, and year of study.",
  },
  {
    number: "03",
    title: "Discover & Engage",
    description:
      "Instantly browse active clubs, join discussions, and RSVP for upcoming campus events.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1c1b1b]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-16 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200 flex justify-between items-center px-6">
        <span className="text-xl font-bold tracking-tight">Student Hub</span>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            How It Works
          </a>
        </div>
        <Link
          to="/login"
          className="px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Login
        </Link>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-[700px] z-10">
            <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
              Your Campus Community, Connected.
            </h1>
            <p className="text-base leading-relaxed text-neutral-500 mb-8">
              A verified platform for students to discover clubs, join
              communities, and never miss an event. Empowering academic
              collaboration and social engagement.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
              <button className="px-8 py-3 bg-neutral-100 text-neutral-800 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all">
                View Demo
              </button>
            </div>
          </div>

          <div className="mt-16 w-full max-w-[1000px] aspect-video rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative w-4/5 h-4/5 border border-neutral-100 rounded-lg bg-neutral-50 flex flex-col items-center justify-center text-neutral-300">
              <Compass className="w-16 h-16 mb-2" />
              <span className="text-sm font-medium">
                Community Infrastructure
              </span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-24 px-6 bg-white border-y border-neutral-200"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16 text-center">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
                Capabilities
              </span>
              <h2 className="text-3xl font-semibold mt-2">
                Designed for Modern Campuses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-neutral-900 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-semibold">Seamless Onboarding</h2>
              <p className="text-base text-neutral-500 mt-2">
                Three simple steps to join your university's digital ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, i) => (
                <div key={step.number} className="flex flex-col gap-4 relative">
                  <div className="text-5xl font-bold text-neutral-900/10 absolute -top-8 -left-2 select-none">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-semibold z-10">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-neutral-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-neutral-900 text-white">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl font-semibold mb-4">
              Ready to unify your campus?
            </h2>
            <p className="text-base text-neutral-400 mb-8 max-w-[700px]">
              Join hundreds of universities providing a centralized, secure, and
              engaging platform for their student body.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                Contact Sales
              </button>
              <button className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-lg font-bold">Student Hub</span>
            <p className="text-xs text-neutral-500">
              &copy; 2024 Student Hub. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              Contact Support
            </a>
          </div>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-900" />
            <Mail className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-900" />
          </div>
        </div>
      </footer>
    </div>
  );
}

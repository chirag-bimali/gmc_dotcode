import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { FormField } from "@shared/ui/Input/FormField";
import { completeProfile } from "@features/auth/api/completeProfile";

const INTEREST_OPTIONS = [
  "Design",
  "Engineering",
  "Sports",
  "Music",
  "Coding",
  "Writing",
  "Photography",
  "Data Science",
];

const FACULTY_OPTIONS = ["Engineering", "Sciences", "Arts & Humanities", "Business"];

const DEPARTMENT_OPTIONS = [
  "Computer Science",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
];

const BATCH_OPTIONS = [
  "Batch of 2024",
  "Batch of 2025",
  "Batch of 2026",
  "Batch of 2027",
];

type SocialLink = { platform: string; url: string };

type CompleteProfileStepProps = {
  email: string;
  universityName: string;
};

export function CompleteProfileStep({ email, universityName }: CompleteProfileStepProps) {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "LinkedIn", url: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  }

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, { platform: "LinkedIn", url: "" }]);
  }

  function updateSocialLink(index: number, field: keyof SocialLink, value: string) {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    try {
      await completeProfile({
        bio,
        faculty,
        department,
        batch,
        interests,
        socialLinks: socialLinks.filter((l) => l.url.trim() !== ""),
      });
      navigate({ to: "/dashboard" });
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSkip() {
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-5xl mx-auto">
          <h1 className="text-lg font-semibold text-zinc-900">Student Hub</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">{email}</span>
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16 px-6">
        <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-lg shadow-sm p-8">
          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
              Complete your profile
            </h2>
            <p className="text-sm text-zinc-500">
              Almost there! Let's personalize your experience.
            </p>
          </section>

          {/* Progress Stepper */}
          <div className="flex items-center justify-between mb-12 px-4 relative">
            <div className="absolute top-4 left-12 right-12 h-px bg-zinc-200" />

            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-zinc-500">Accept Invitation</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-zinc-500">Create Password</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-900 flex items-center justify-center shadow-sm">
                <span className="text-xs font-semibold text-white">3</span>
              </div>
              <span className="text-xs font-semibold text-zinc-900">Complete Profile</span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* Basic Info */}
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-zinc-900 border-b border-zinc-100 pb-2">
                Basic Info
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-zinc-100 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center transition-colors group-hover:bg-zinc-200 group-hover:border-zinc-400">
                    <svg
                      className="w-6 h-6 text-zinc-400 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                      />
                    </svg>
                    <span className="text-xs text-zinc-500">Upload</span>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <FormField label="Bio">
                    <textarea
                      className="w-full h-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors focus:border-zinc-900 focus:outline-none resize-none"
                      maxLength={300}
                      placeholder="Tell us a bit about your academic interests..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </FormField>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-zinc-400">
                      {bio.length}/300 characters
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-zinc-900 border-b border-zinc-100 pb-2">
                Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    University
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                      />
                    </svg>
                    {universityName}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    {email}
                  </div>
                </div>
                <FormField label="Faculty">
                  <select
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors focus:border-zinc-900 focus:outline-none"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    <option value="">Select Faculty</option>
                    {FACULTY_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Department">
                  <select
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors focus:border-zinc-900 focus:outline-none"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENT_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </FormField>
                <div className="md:col-span-2">
                  <FormField label="Batch">
                    <select
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors focus:border-zinc-900 focus:outline-none"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    >
                      <option value="">Select Graduation Year</option>
                      {BATCH_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>
              </div>
            </div>

            {/* Interests & Skills */}
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-zinc-900 border-b border-zinc-100 pb-2">
                Interests & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      interests.includes(interest)
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-zinc-900 border-b border-zinc-100 pb-2">
                Social Profiles
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-3 items-end md:items-center"
                  >
                    <div className="w-full md:w-1/3">
                      <FormField label={index === 0 ? "Platform" : undefined}>
                        <select
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors focus:border-zinc-900 focus:outline-none"
                          value={link.platform}
                          onChange={(e) =>
                            updateSocialLink(index, "platform", e.target.value)
                          }
                        >
                          <option>LinkedIn</option>
                          <option>GitHub</option>
                          <option>X (Twitter)</option>
                          <option>Personal Website</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="flex-1 w-full">
                      <FormField label={index === 0 ? "URL" : undefined}>
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={link.url}
                          onChange={(e) =>
                            updateSocialLink(index, "url", e.target.value)
                          }
                        />
                      </FormField>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSocialLink}
                className="flex items-center gap-1 text-xs font-medium text-zinc-900 hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add more
              </button>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <Button type="submit" className="w-full md:w-auto md:min-w-60" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Complete Profile"}
              </Button>
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:underline transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="w-full py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-2xl mx-auto">
          <span className="text-xs text-zinc-400 mb-3 md:mb-0">
            &copy; 2024 Student Hub. All rights reserved.
          </span>
          <div className="flex gap-6">
            <span className="text-xs text-zinc-400">Privacy Policy</span>
            <span className="text-xs text-zinc-400">Terms of Service</span>
            <span className="text-xs text-zinc-400">Help Center</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

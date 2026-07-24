import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { FormField } from "@shared/ui/Input/FormField";
import { verifyInvite, acceptInvite } from "@features/auth/api/invite";
import { useAuthStore } from "@shared/store/auth-store";
import { mapServerErrors } from "@shared/util/mapServerErrors";
import type { NormalizedApiError } from "@shared/api/http";
import { CompleteProfileStep } from "./CompleteProfileStep";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

type InviteState =
  | { status: "loading" }
  | { status: "valid"; email: string; universityName: string }
  | { status: "invalid"; message: string };

type Step = "invitation" | "create-password" | "complete-profile";

export function InvitePage() {
  const { token } = useSearch({ from: "/invite" });
  const setAuth = useAuthStore((s) => s.setAuth);
  const [inviteState, setInviteState] = useState<InviteState>({ status: "loading" });
  const [step, setStep] = useState<Step>("invitation");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (!token) {
      setInviteState({ status: "invalid", message: "No invitation token provided." });
      return;
    }

    verifyInvite(token)
      .then((res) => {
        const data = res.data.data!;
        setInviteState({
          status: "valid",
          email: data.email,
          universityName: data.universityName,
        });
      })
      .catch((err: NormalizedApiError) => {
        setInviteState({
          status: "invalid",
          message: err.message || "This invitation is invalid or has expired.",
        });
      });
  }, [token]);

  async function onSubmit(data: PasswordFormValues) {
    setServerError(null);
    try {
      const response = await acceptInvite({
        token: token!,
        password: data.password,
      });
      const result = response.data.data!;
      localStorage.setItem("accessToken", result.token);
      setAuth(result.token, result.user);
      setStep("complete-profile");
    } catch (err) {
      const apiError = err as NormalizedApiError;
      if (apiError.error?.details) {
        mapServerErrors<PasswordFormValues>(apiError.error.details, setError);
      } else {
        setServerError(apiError.message || "Something went wrong. Please try again.");
      }
    }
  }

  if (inviteState.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-zinc-500">Verifying invitation...</p>
      </div>
    );
  }

  if (inviteState.status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-red-600 text-xl">!</span>
          </div>
          <h1 className="text-xl font-bold">Invalid Invitation</h1>
          <p className="text-sm text-zinc-500">{inviteState.message}</p>
          <Link
            to="/"
            className="inline-block mt-4 text-sm font-medium text-zinc-900 hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (step === "complete-profile") {
    return (
      <CompleteProfileStep
        email={inviteState.email}
        universityName={inviteState.universityName}
      />
    );
  }

  if (step === "invitation") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-8">
        <div className="w-full max-w-120">
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 md:p-8 flex flex-col items-center text-center">
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
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
              </div>
              <h1 className="text-lg font-bold text-zinc-900">Student Hub</h1>
            </div>

            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                You've been invited!
              </h2>
              <p className="text-sm text-zinc-500">A new academic journey awaits you.</p>
            </div>

            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-8 text-left flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-zinc-200 shrink-0 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {inviteState.universityName}
                </h3>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Academic Portal Access
                </p>
              </div>
            </div>

            <div className="w-full space-y-4 mb-8 text-center">
              <p className="text-sm text-zinc-600 leading-relaxed">
                You've been invited to join{" "}
                <span className="font-semibold text-zinc-900">
                  {inviteState.universityName}
                </span>{" "}
                on Student Hub. Connect with peers, access course materials, and manage
                your academic life.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full">
                <svg
                  className="w-4 h-4 text-zinc-400"
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
                <span className="text-xs font-medium text-zinc-700">
                  {inviteState.email}
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep("create-password")}
            >
              Accept Invitation
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>

            <div className="mt-6">
              <p className="text-sm text-zinc-500">
                Not interested?{" "}
                <Link to="/" className="font-medium text-zinc-900 hover:underline">
                  You can ignore this invitation.
                </Link>
              </p>
            </div>
          </div>

          <footer className="mt-6 text-center space-y-2">
            <div className="flex justify-center gap-6">
              <span className="text-xs text-zinc-400">Privacy Policy</span>
              <span className="text-xs text-zinc-400">Terms of Service</span>
              <span className="text-xs text-zinc-400">Help Center</span>
            </div>
            <p className="text-xs text-zinc-400">
              &copy; 2024 Student Hub. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-5xl mx-auto">
          <h1 className="text-lg font-semibold text-zinc-900">Student Hub</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">{inviteState.email}</span>
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

      <main className="min-h-[calc(100vh-130px)] py-16 px-6">
        <div className="max-w-lg mx-auto bg-white border border-zinc-200 rounded-lg shadow-sm p-8">
          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
              Create your password
            </h2>
            <p className="text-sm text-zinc-500">
              Secure your account to get started.
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
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-900 flex items-center justify-center shadow-sm">
                <span className="text-xs font-semibold text-white">2</span>
              </div>
              <span className="text-xs font-semibold text-zinc-900">Create Password</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <span className="text-xs font-medium text-zinc-400">3</span>
              </div>
              <span className="text-xs font-medium text-zinc-400">Complete Profile</span>
            </div>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <FormField label="Password" error={errors.password?.message}>
              <Input
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                {...register("password")}
              />
            </FormField>

            <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
              <Input
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </FormField>

            <p className="text-xs text-zinc-400">
              Must be at least 8 characters long.
            </p>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Continue"}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-zinc-900 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="w-full py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-lg mx-auto">
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

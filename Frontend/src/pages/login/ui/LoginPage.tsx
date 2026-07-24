import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { FormField } from "@shared/ui/Input/FormField";
import { login } from "@features/auth/api/login";
import { useAuthStore } from "@shared/store/auth-store";
import { mapServerErrors } from "@shared/util/mapServerErrors";
import type { NormalizedApiError } from "@shared/api/http";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    setServerError(null);
    try {
      const response = await login(data);
      const { token, user } = response.data.data!;
      localStorage.setItem("accessToken", token);
      setAuth(token, user);
      navigate({ to: "/dashboard" });
    } catch (err) {
      const apiError = err as NormalizedApiError;
      if (apiError.error?.details) {
        mapServerErrors<LoginFormValues>(apiError.error.details, setError);
      } else {
        setServerError(apiError.message || "Login failed. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Sign in to your Student Hub account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="you@university.edu"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password")}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link to="/" className="font-medium text-zinc-900 hover:underline">
            Request access
          </Link>
        </p>
      </div>
    </div>
  );
}

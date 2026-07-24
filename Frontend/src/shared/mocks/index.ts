export async function enableMocking() {
  if (import.meta.env.VITE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to SAA 2025
        </h1>
        <p className="text-lg text-white/70">
          Logged in as {user.email}
        </p>
      </div>
    </div>
  );
}

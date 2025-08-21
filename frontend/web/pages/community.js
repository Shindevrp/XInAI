import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function CommunityPage() {
  const router = useRouter();
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      }
    }
    checkSession();
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Community!</h1>
    </div>
  );
}

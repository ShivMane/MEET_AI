"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export const HomeView = () => {
    const router = useRouter();
  const {data: session} = authClient.useSession();

  if (!session) {
    return (
      <p>Loading...</p>
    )
  }

  return (
      <div className="p-4 flex flex-col gap-y-4">
        <h1 className="text-2xl">Welcome, {session.user.name}</h1>
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: async () => { await router.push('/sign-in'); }
            }
        })
        }>
          Sign Out
        </Button>
      </div>
    );
};
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  if (session.status === "loading") {
    return "loading...";
  }

  if (session.status === "unauthenticated") {
    return (
      <div>
        unauthenticated <button onClick={() => signIn()}>Signin</button>
      </div>
    );
  }

  return (
    <div>
      Dashboard <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

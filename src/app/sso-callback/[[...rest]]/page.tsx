// app/sso-callback/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SSOCallbackPage() {
  const { userId } =await auth();

  if (userId) {
    redirect("/"); // or wherever you want users to land after login
  }

  return <div>Signing you in...</div>;
}

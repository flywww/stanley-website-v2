import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export async function requireAdmin(redirectTo = "/admin") {
  if (!process.env.AUTH_SECRET || !process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET || !process.env.ADMIN_GITHUB_LOGIN) {
    redirect("/admin/forbidden?reason=setup");
  }

  const session = await auth();
  const login = session?.user?.login?.toLowerCase();
  const allowedLogin = process.env.ADMIN_GITHUB_LOGIN?.trim().toLowerCase();

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(redirectTo)}`);
  }

  if (!login || !allowedLogin || login !== allowedLogin) {
    redirect("/admin/forbidden");
  }

  return session;
}

export async function signOutAction() {
  "use server";

  await signOut({
    redirectTo: "/",
  });
}

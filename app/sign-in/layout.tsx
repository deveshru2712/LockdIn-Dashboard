import { getSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
    return null;
  }

  return <>{children}</>;
}

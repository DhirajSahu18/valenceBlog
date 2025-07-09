import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminHeader } from "@/components/admin/admin-header";
import { useEffect, useState } from "react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}

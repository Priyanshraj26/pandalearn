import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import SettingsForm from "@/components/dashboard/SettingsForm"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  let user: {
    name: string | null
    email: string | null
    track: string | null
    board: string | null
    password: string | null
  } | null = null

  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, track: true, board: true, password: true },
    })
  } catch {
    // DB not yet provisioned — fall back to session
  }

  const profile = {
    name:        user?.name        ?? session.user.name  ?? null,
    email:       user?.email       ?? session.user.email ?? null,
    track:       user?.track       ?? session.user.track ?? null,
    board:       user?.board       ?? null,
    hasPassword: !!(user?.password),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sora text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and learning preferences.</p>
      </div>
      <SettingsForm profile={profile} />
    </div>
  )
}

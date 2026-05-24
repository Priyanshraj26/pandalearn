import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { name, track, board, currentPassword, newPassword } = body

  const updateData: Record<string, unknown> = {}

  if (name !== undefined) {
    const trimmed = (name as string).trim()
    if (!trimmed) return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 })
    updateData.name = trimmed
  }

  if (track !== undefined) {
    if (track !== null && !["school", "engineering"].includes(track as string)) {
      return NextResponse.json({ error: "Invalid track" }, { status: 400 })
    }
    updateData.track = track
    if (track !== "school") updateData.board = null
  }

  if (board !== undefined) {
    if (board !== null && !["cbse", "icse", "state_board"].includes(board as string)) {
      return NextResponse.json({ error: "Invalid board" }, { status: 400 })
    }
    updateData.board = board
  }

  if (newPassword) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    })
    if (!user?.password) {
      return NextResponse.json({ error: "Cannot change password for OAuth accounts" }, { status: 400 })
    }
    if (!currentPassword) {
      return NextResponse.json({ error: "Current password is required" }, { status: 400 })
    }
    const valid = await bcrypt.compare(currentPassword as string, user.password)
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }
    if ((newPassword as string).length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 })
    }
    updateData.password = await bcrypt.hash(newPassword as string, 12)
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No changes provided" }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
    select: { id: true, name: true, email: true, track: true, board: true },
  })

  return NextResponse.json(updated)
}

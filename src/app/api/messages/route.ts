import { NextResponse } from "next/server";
import { messageSchema } from "@/schemas/message";
import { moderationService } from "@/services/moderationService";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as unknown;
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Entrada invlida." }, { status: 400 });
  }

  const moderation = moderationService(parsed.data.content);
  if (moderation.status === "rejected") {
    return NextResponse.json({ ok: false, status: moderation.status, message: moderation.userMessage }, { status: 422 });
  }

  return NextResponse.json({ ok: true, status: moderation.status, message: moderation.userMessage });
}


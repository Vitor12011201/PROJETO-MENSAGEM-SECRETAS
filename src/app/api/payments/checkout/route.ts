import { NextResponse } from "next/server";
import { MockPaymentProvider } from "@/services/mockPaymentProvider";

const provider = new MockPaymentProvider();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const userId = typeof body?.userId === "string" ? body.userId : "anonymous";
  const plan = body?.plan === "free" ? "free" : "pro";
  const checkout = await provider.createCheckout(userId, plan);
  return NextResponse.json({ ok: true, checkout });
}


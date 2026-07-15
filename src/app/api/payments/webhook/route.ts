import { NextResponse } from "next/server";
import { MockPaymentProvider } from "@/services/mockPaymentProvider";

const provider = new MockPaymentProvider();

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({})) as unknown;
  const result = await provider.handleWebhook(payload);
  return NextResponse.json({ ok: true, result });
}


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { StartupData } from "@/models/StartupData";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { params } = context;

  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const decoded = verifyToken(token);

  const startup = await StartupData.findById(params.id);
  if (!startup || startup.founderEmail !== decoded.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await StartupData.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
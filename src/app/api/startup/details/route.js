import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Startup from "@/models/Startup";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, email, founders, targetFund, pitchMaterials } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const startup = await Startup.findById(id);
    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    // Update startup details
    startup.name = name;
    startup.email = email;
    startup.founders = founders || [];
    startup.targetFund = targetFund || 0;
    startup.pitchMaterials = pitchMaterials || [];

    await startup.save();

    return NextResponse.json({
      message: "Startup details added successfully",
      startup
    });
  } catch (error) {
    console.error("Error saving startup details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import StartupData from "@/models/StartupData";
import { verifyToken } from "@/lib/auth";


export async function POST(request) {
  try {
        const token = request.cookies.get("auth_token")?.value;
    const decoded = verifyToken(token);
    const founderUserId = decoded.id; 
    const body = await request.json();
    const {
      startupName,
      description,
      industry,
      location,
      problem,
      solution,
      founderName,
      founderEmail,
      founderLinkedIn,
      cofounderName,
      cofounderEmail,
      cofounderLinkedin,
      pitchDeck,
      walletAddress,
    } = body;

    // Validate required fields
    if (!startupName || !description || !industry || !location || !walletAddress) {
      console.error("Missing required fields:", {
        startupName,
        description,
        industry,
        location,
        walletAddress
      });
      return NextResponse.json(
        {
          error:
            "Missing required fields: startupName, description, industry, or location."
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newStartup = new StartupData({
      startupName,
      description,
      industry,
      location,
      problem,
      solution,
      founderName,
      founderEmail,
      founderLinkedIn,
      cofounderName,
      cofounderEmail,
      cofounderLinkedin,
      pitchDeck,
        walletAddress,
         founderUserId,
    });

    await newStartup.save();

    return NextResponse.json({
      message: "Startup details saved successfully",
      startup: newStartup
    });
  } catch (error) {
    console.error("Error saving startup details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectToDatabase();

    const startups = await StartupData.find({}, 'startupName industry description image');

    return NextResponse.json(startups, { status: 200 });
  } catch (error) {
    console.error("Error fetching startup data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
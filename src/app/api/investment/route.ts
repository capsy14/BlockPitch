import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import  StartupData  from "@/models/StartupData";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { startupId, investorId, name, email, amount, walletAddress } = await request.json();

    // Push the investor info into the startup's currentInvestors array
    await StartupData.findByIdAndUpdate(
      startupId,
      {
        $push: {
          currentInvestors: {
            investorId,
            name,
            email,
            amount,
            walletAddress,
            date: new Date()
          }
        }
      }
    );

    return NextResponse.json({ message: "Investment recorded" });
  } catch (error) {
    console.error("Error saving investment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const { founderEmail, founderName, investorName = "An investor" } = await request.json()

    if (!founderEmail) {
      return NextResponse.json({ error: "Founder email is required" }, { status: 400 })
    }

    // Generate a unique room ID using UUID
    const roomId = uuidv4()
    const roomUrl = `https://meet.jit.si/${roomId}`

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use app password if 2FA is enabled
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: founderEmail,
      subject: `Video Call Request from ${investorName}`,
      html: `
        <h1>Video Call Request</h1>
        <p>Hello ${founderName || "Founder"},</p>
        <p>${investorName} has requested a video call with you regarding your startup.</p>
        <p>Join the meeting by clicking the link below:</p>
        <p><a href="${roomUrl}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Join Video Call</a></p>
        <p>Or copy this link: ${roomUrl}</p>
        <p>The investor has been directed to the same room and may be waiting for you.</p>
        <p>Best regards,<br>Your Platform Team</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Return the room URL to redirect the investor
    return NextResponse.json({ success: true, roomUrl })
  } catch (error) {
    console.error("Error requesting video call:", error)
    return NextResponse.json({ error: "Failed to process video call request" }, { status: 500 })
  }
}

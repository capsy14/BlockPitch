
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, from, name, subject, message, founderName } = body

    // Validate required fields
    if (!to || !from || !name || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get Gmail credentials from environment variables
    const GMAIL_USER = process.env.GMAIL_USER 
    const GMAIL_PASS = process.env.GMAIL_PASS

    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error("Gmail credentials are not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
        

      },
    })

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New message from ${name}</h2>
        <p><strong>From:</strong> ${name} (${from})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="margin-top: 20px; color: #777; font-size: 12px;">
          This message was sent via the Connect with Founder feature.
        </p>
      </div>
    `

    // Configure email options
    const mailOptions = {
      from: GMAIL_USER, // Sending from your Gmail
      to: to, // Sending to the founder
      replyTo: from, // Set reply-to as the user's email
      subject: `[Connect Request] ${subject}`,
      text: `Message from: ${name} (${from})\n\nSubject: ${subject}\n\n${message}`,
      html: htmlContent,
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully:", info.messageId)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

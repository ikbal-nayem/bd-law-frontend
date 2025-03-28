import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Get IP address from request headers
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "0.0.0.0"

    // Get location information based on IP
    // Using a free IP geolocation API
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    const geoData = await geoResponse.json()

    return NextResponse.json({
      ip,
      country: geoData.country_name || "Unknown",
      city: geoData.city || "Unknown",
      region: geoData.region || "Unknown",
    })
  } catch (error) {
    console.error("Error getting user info:", error)
    return NextResponse.json({ error: "Failed to get user information" }, { status: 500 })
  }
}


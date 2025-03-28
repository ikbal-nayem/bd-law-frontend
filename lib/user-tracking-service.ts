import { getSupabaseClient } from "./supabase-client"
import { getBrowserInfo } from "./browser-utils"

export interface UserSessionInfo {
  ip_address: string
  country: string
  city: string
  region: string
  browser: string
  browser_version: string
  os: string
  device: string
}

export const saveUserSession = async (): Promise<string | null> => {
  try {
    // Get browser information
    const { browser, browserVersion, os, device } = getBrowserInfo()

    // Get IP and location information from our API
    const response = await fetch("/api/user-info")
    const { ip, country, city, region } = await response.json()

    // Save to Supabase
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({
        ip_address: ip,
        country,
        city,
        region,
        browser,
        browser_version: browserVersion,
        os,
        device,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error saving user session:", error)
      return null
    }

    return data.id
  } catch (error) {
    console.error("Error in saveUserSession:", error)
    return null
  }
}

export const updateUserLastActive = async (sessionId: string) => {
  if (!sessionId) return

  try {
    const supabase = getSupabaseClient()
    await supabase.from("chat_sessions").update({ last_active_at: new Date().toISOString() }).eq("id", sessionId)
  } catch (error) {
    console.error("Error updating user last active:", error)
  }
}


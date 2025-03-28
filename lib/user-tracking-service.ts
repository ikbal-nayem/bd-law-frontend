import { getSupabaseClient } from "./supabase-client"

interface ChatSession extends Record<string, unknown> {
  ip_address: string
  location: string | null
  started_at: string
  user_agent: string
}

export const trackChatSession = async () => {
  const supabase = getSupabaseClient()
  
  try {
    // Get IP and location
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const { ip } = await ipResponse.json()
    
    let location = null
    try {
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
      const locationData = await locationResponse.json()
      location = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`
    } catch (e) {
      console.error('Failed to get location', e)
    }

    const sessionData: ChatSession = {
      ip_address: ip,
      location,
      started_at: new Date().toISOString(),
      user_agent: navigator.userAgent
    }

    const { error } = await supabase
      .from('chat_sessions')
      .insert(sessionData)

    if (error) throw error
  } catch (error) {
    console.error('Failed to track chat session', error)
  }
}

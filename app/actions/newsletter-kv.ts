"use server"

import { kv } from "@vercel/kv"

const SUBSCRIBERS_KEY = "newsletter:subscribers"

interface Subscriber {
  email: string
  timestamp: string
  source?: string
}

/**
 * Subscribe to newsletter with KV storage
 */
export async function subscribeToNewsletterKV(email: string, source = "coming-soon") {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    const normalizedEmail = email.toLowerCase()

    // Check if already subscribed
    const exists = await kv.sismember(SUBSCRIBERS_KEY, normalizedEmail)
    if (exists) {
      return {
        success: false,
        error: "This email is already registered",
      }
    }

    // Save to KV
    await kv.sadd(SUBSCRIBERS_KEY, normalizedEmail)

    // Store detailed info
    const subscriber: Subscriber = {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      source,
    }
    await kv.set(`subscriber:${normalizedEmail}`, subscriber)

    // Increment counter
    await kv.incr("newsletter:count")

    console.log(`✅ New subscriber: ${email}`)

    return {
      success: true,
      message: "Thank you! We'll notify you when we launch.",
    }
  } catch (error) {
    console.error("Error subscribing:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

/**
 * Get all subscribers from KV
 */
export async function getSubscribersKV() {
  try {
    const emails = await kv.smembers(SUBSCRIBERS_KEY)
    const count = await kv.get<number>("newsletter:count")

    const subscribers = await Promise.all(
      (emails as string[]).map(async (email) => {
        const details = await kv.get<Subscriber>(`subscriber:${email}`)
        return details || { email, timestamp: "Unknown", source: "Unknown" }
      }),
    )

    return {
      success: true,
      subscribers,
      count: count || 0,
    }
  } catch (error) {
    console.error("Error getting subscribers:", error)
    return {
      success: false,
      error: "Failed to fetch subscribers",
      subscribers: [],
      count: 0,
    }
  }
}

/**
 * Export subscribers as CSV from KV
 */
export async function exportSubscribersCSVKV() {
  try {
    const { subscribers } = await getSubscribersKV()

    const csv = ["Email,Timestamp,Source", ...subscribers.map((s) => `${s.email},${s.timestamp},${s.source}`)].join(
      "\n",
    )

    return {
      success: true,
      csv,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to export",
    }
  }
}

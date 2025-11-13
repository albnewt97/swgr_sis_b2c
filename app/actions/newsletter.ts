"use server"

// Simple in-memory storage (will reset on deployment)
// For production, use a database or email service
const emailList: Array<{
  email: string
  timestamp: string
  ip?: string
}> = []

/**
 * Subscribe to newsletter (Server Action)
 */
export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Check if already subscribed
    const exists = emailList.some((item) => item.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return {
        success: false,
        error: "This email is already registered",
      }
    }

    // Save email
    emailList.push({
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
    })

    console.log(`✅ New subscriber: ${email}`)
    console.log(`📧 Total subscribers: ${emailList.length}`)

    // TODO: Send to your email service (Mailchimp, ConvertKit, etc.)
    // await sendToMailchimp(email)

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
 * Get all subscribers (Server Action - for admin use)
 */
export async function getSubscribers() {
  return {
    success: true,
    subscribers: emailList,
    count: emailList.length,
  }
}

/**
 * Export subscribers as CSV
 */
export async function exportSubscribersCSV() {
  const csv = ["Email,Timestamp", ...emailList.map((item) => `${item.email},${item.timestamp}`)].join("\n")

  return {
    success: true,
    csv,
  }
}

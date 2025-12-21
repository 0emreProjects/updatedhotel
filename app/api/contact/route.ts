import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      partyDate,
      partyTime,
      numGuests,
    } = body

    // Create email content
    const emailContent = `
New Contact Form Submission from Lakeside Inn Website

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

${partyDate ? `Date of Party: ${partyDate}` : ''}
${partyTime ? `Time: ${partyTime}` : ''}
${numGuests ? `Number of Guests: ${numGuests}` : ''}

Message:
${message}
    `.trim()

    // Create mailto link (this will be handled client-side)
    // In production, integrate with an email service like SendGrid, Mailgun, or AWS SES
    // For now, we'll log the submission and return success
    // The client can use mailto: link as fallback
    
    // Submitted form data received (logging removed for production).

    // TODO: Integrate with email service
    // Example with SendGrid:
    // await sendGrid.send({
    //   to: 'frontdeskmanager@thelakesidepark.com',
    //   from: 'noreply@lakesideinn.com',
    //   subject: `Contact Form: ${firstName} ${lastName}`,
    //   text: emailContent,
    // })

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    )
  }
}


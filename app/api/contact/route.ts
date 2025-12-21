import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      subject,
      partyDate,
      partyTime,
      numGuests,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from Lakeside Inn Website

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

${subject ? `Subject: ${subject}` : ''}
${partyDate ? `Date of Party: ${partyDate}` : ''}
${partyTime ? `Time: ${partyTime}` : ''}
${numGuests ? `Number of Guests: ${numGuests}` : ''}

Message:
${message}
    `.trim()

    // Create HTML version for better formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p><strong>From:</strong> Lakeside Inn Website</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          ${partyDate ? `<p><strong>Date of Party:</strong> ${partyDate}</p>` : ''}
          ${partyTime ? `<p><strong>Time:</strong> ${partyTime}</p>` : ''}
          ${numGuests ? `<p><strong>Number of Guests:</strong> ${numGuests}</p>` : ''}
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #2563eb;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This email was sent from the Lakeside Inn contact form.
        </p>
      </div>
    `

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Lakeside Inn <noreply@lakesideinn.com>',
        to: 'frontdeskmanager@thelakesidepark.com',
        replyTo: email,
        subject: `Contact Form: ${subject || 'General Inquiry'} - ${firstName} ${lastName}`,
        text: emailContent,
        html: htmlContent,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { success: false, message: 'Failed to send email. Please try again later.' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { success: true, message: 'Thank you! Your message has been sent successfully.' },
        { status: 200 }
      )
    } else {
      // Fallback if API key is not configured (for development)
      console.log('Email would be sent:', {
        to: 'frontdeskmanager@thelakesidepark.com',
        subject: `Contact Form: ${subject || 'General Inquiry'} - ${firstName} ${lastName}`,
        content: emailContent,
      })

      return NextResponse.json(
        { success: true, message: 'Form submitted successfully (email service not configured)' },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}


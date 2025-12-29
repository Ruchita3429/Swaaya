import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if SMTP configuration is available
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP configuration missing. Please check your .env.local file.');
      console.error('Required variables: SMTP_HOST, SMTP_USER, SMTP_PASSWORD');
      console.error('Current values:');
      console.error('  SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
      console.error('  SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
      console.error('  SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'SET (hidden)' : 'NOT SET');
      return NextResponse.json(
        { error: 'Email service is not configured. Please check your .env.local file and restart the server.' },
        { status: 503 }
      );
    }

    // Log SMTP configuration for debugging (without sensitive info)
    console.log('SMTP Configuration:');
    console.log('  Host:', process.env.SMTP_HOST);
    console.log('  Port:', process.env.SMTP_PORT || '587');
    console.log('  User:', process.env.SMTP_USER);
    console.log('  From:', process.env.SMTP_FROM || process.env.SMTP_USER);
    console.log('  To:', process.env.CONTACT_EMAIL || process.env.SMTP_USER);

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Add connection timeout and retry options
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #111827; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #111827; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    };

    // Send email (verify is optional - some SMTP servers don't support it)
    try {
      await transporter.sendMail(mailOptions);
    } catch (sendError: any) {
      console.error('Error sending email:', sendError);
      
      // If send fails, try to provide helpful error message
      if (sendError.code === 'EAUTH' || sendError.responseCode === 535) {
        return NextResponse.json(
          { error: 'Email authentication failed. Please check your SMTP_USER and SMTP_PASSWORD in .env.local' },
          { status: 503 }
        );
      }
      
      throw sendError; // Re-throw to be caught by outer catch
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    if (error.code === 'ESOCKET' || error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Unable to connect to email server. Please check your SMTP configuration.' },
        { status: 503 }
      );
    }
    
    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { error: 'Email authentication failed. Please check your SMTP credentials.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}


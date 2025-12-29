import nodemailer from 'nodemailer';
import { createError } from '../middleware/errorHandler';

// SMTP Configuration from environment variables
const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !password) {
    throw createError('SMTP configuration is missing. Please check your environment variables.', 500);
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass: password,
    },
    from,
  };
};

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter => {
  if (!transporter) {
    const config = getSmtpConfig();
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }
  return transporter;
};

// Verify SMTP connection
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return false;
  }
};

// Send email function
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  try {
    const config = getSmtpConfig();
    const transporter = getTransporter();

    const mailOptions = {
      from: options.from || config.from,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw createError(`Failed to send email: ${error.message}`, 500);
  }
};

// Order Confirmation Email Template
interface OrderItem {
  product: {
    name: string;
    image: string;
  };
  quantity: number;
  price: number;
}

interface OrderConfirmationData {
  orderId: number;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  items: OrderItem[];
  orderDate: Date;
}

export const sendOrderConfirmationEmail = async (data: OrderConfirmationData): Promise<void> => {
  const itemsHtml = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.product.name}</strong>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${item.price.toFixed(2)}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Swayaa</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">Thank You for Your Order!</h1>
      </div>
      
      <p>Dear ${data.customerName},</p>
      
      <p>We're excited to confirm that we've received your order <strong>#${data.orderId}</strong>.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #2c3e50;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #e9ecef;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #dee2e6;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #dee2e6;">
                Total Amount:
              </td>
              <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 1.2em; color: #2c3e50; border-top: 2px solid #dee2e6;">
                ₹${data.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="background-color: #e7f3ff; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
        <p style="margin: 0;"><strong>Order Date:</strong> ${new Date(data.orderDate).toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}</p>
        <p style="margin: 5px 0 0 0;"><strong>Order Status:</strong> Pending</p>
      </div>
      
      <p>We'll send you another email once your order has been shipped. You can track your order status anytime.</p>
      
      <p>If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>The Swayaa Team</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 0.9em; text-align: center;">
        This is an automated email. Please do not reply to this message.
      </p>
    </body>
    </html>
  `;

  const text = `
Thank You for Your Order!

Dear ${data.customerName},

We're excited to confirm that we've received your order #${data.orderId}.

Order Summary:
${data.items.map((item) => `- ${item.product.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total Amount: ₹${data.totalAmount.toFixed(2)}
Order Date: ${new Date(data.orderDate).toLocaleString('en-IN')}
Order Status: Pending

We'll send you another email once your order has been shipped.

Best regards,
The Swayaa Team
  `;

  await sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation - Order #${data.orderId}`,
    html,
    text,
  });
};

// Contact Form Email Template
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactFormEmail = async (data: ContactFormData): Promise<void> => {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || process.env.SMTP_FROM;

  if (!contactEmail) {
    throw createError('Contact email is not configured', 500);
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Swayaa</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">New Contact Form Submission</h1>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${data.message}
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 5px;">
        <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}</p>
      </div>
      
      <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
        You can reply directly to this email to respond to ${data.name}.
      </p>
    </body>
    </html>
  `;

  const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-IN')}
  `;

  // Send to contact email
  await sendEmail({
    to: contactEmail,
    subject: `Contact Form: ${data.subject}`,
    html,
    text,
    replyTo: data.email, // Allow replying directly to the sender
  });

  // Send confirmation to the user
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us - Swayaa</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">Thank You for Contacting Us!</h1>
      </div>
      
      <p>Dear ${data.name},</p>
      
      <p>We've received your message and will get back to you as soon as possible.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Subject:</strong> ${data.subject}</p>
        <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}</p>
      </div>
      
      <p>Our team typically responds within 24-48 hours. If your inquiry is urgent, please feel free to call us.</p>
      
      <p>Best regards,<br>The Swayaa Team</p>
    </body>
    </html>
  `;

  await sendEmail({
    to: data.email,
    subject: 'Thank You for Contacting Swayaa',
    html: confirmationHtml,
    text: `Thank You for Contacting Us!\n\nDear ${data.name},\n\nWe've received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Swayaa Team`,
  });
};


import { Request, Response, NextFunction } from 'express';
import { sendContactFormEmail } from '../services/email.service';
import { createError } from '../middleware/errorHandler';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw createError('All fields are required', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError('Invalid email format', 400);
    }

    // Validate message length
    if (message.trim().length < 10) {
      throw createError('Message must be at least 10 characters long', 400);
    }

    // Send email
    await sendContactFormEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
    });
  } catch (error: any) {
    // If it's already a formatted error, pass it through
    if (error.statusCode) {
      return next(error);
    }
    next(error);
  }
};


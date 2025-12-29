# SMTP Email Setup Guide

## Environment Variables

Create a `.env.local` file in the root of your project (`swayaa/.env.local`) with the following variables:

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com

# Contact Email (where contact form submissions will be sent)
CONTACT_EMAIL=hello@swayaaindia.com
```

## Gmail Setup

1. **Enable 2-Step Verification** on your Google account
2. **Generate an App Password**:
   - Go to Google Account → Security
   - Under "2-Step Verification", click "App passwords"
   - Generate a new app password for "Mail"
   - Use this 16-character password (not your regular Gmail password)

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Custom SMTP
Use your email provider's SMTP settings. Common ports:
- 587 (TLS/STARTTLS)
- 465 (SSL)
- 25 (usually blocked by ISPs)

## Important Notes

1. **Restart your dev server** after creating/updating `.env.local`
2. **Never commit** `.env.local` to git (it's already in .gitignore)
3. **Use App Passwords** for Gmail, not your regular password
4. **Test the connection** by submitting the contact form

## Troubleshooting

### Error: ECONNREFUSED 127.0.0.1:587
- **Cause**: SMTP_HOST is not set or set incorrectly
- **Solution**: Check your `.env.local` file and ensure `SMTP_HOST` is set to your email provider's SMTP server (e.g., `smtp.gmail.com`)

### Error: EAUTH
- **Cause**: Invalid email credentials
- **Solution**: Verify your SMTP_USER and SMTP_PASSWORD are correct. For Gmail, use an App Password.

### Error: Module not found: nodemailer
- **Solution**: Run `npm install nodemailer` in the project directory



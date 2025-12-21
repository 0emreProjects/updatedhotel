# Email Setup Guide

The contact form uses **Resend** to send emails to `frontdeskmanager@thelakesidepark.com`.

## Quick Setup Steps

### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### 2. Get Your API Key
1. Go to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Lakeside Inn Production")
4. Copy the API key (starts with `re_`)

### 3. Verify Your Domain (Optional but Recommended)
For production, you should verify your domain:
1. Go to [Domains](https://resend.com/domains) in Resend
2. Click "Add Domain"
3. Follow the DNS verification steps
4. Once verified, you can use emails like `noreply@yourdomain.com`

**Note:** For testing, you can use Resend's test domain without verification.

### 4. Set Environment Variables

Create a `.env.local` file in the root of your project:

```env
# Resend API Key
RESEND_API_KEY=re_your_api_key_here

# Email address to send from
# For testing (no domain verification needed):
RESEND_FROM_EMAIL=Lakeside Inn <onboarding@resend.dev>

# For production (after domain verification):
# RESEND_FROM_EMAIL=Lakeside Inn <noreply@yourdomain.com>
```

### 5. Deploy Environment Variables

When deploying to Vercel, Netlify, or another platform:

1. **Vercel:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL`

2. **Netlify:**
   - Go to Site settings → Environment variables
   - Add the variables

3. **Other platforms:**
   - Check your platform's documentation for setting environment variables

## Testing

1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email inbox at `frontdeskmanager@thelakesidepark.com`

## Troubleshooting

### Emails not sending?
- Check that `RESEND_API_KEY` is set correctly
- Verify the API key is active in Resend dashboard
- Check the server logs for error messages
- Make sure `RESEND_FROM_EMAIL` is in the correct format

### "Domain not verified" error?
- Use `onboarding@resend.dev` for testing
- Or verify your domain in Resend dashboard

### Rate limits?
- Free tier: 100 emails/day
- Upgrade to a paid plan for more emails

## Alternative Email Services

If you prefer a different email service, you can modify `app/api/contact/route.ts` to use:
- **SendGrid** - Popular, good free tier
- **Mailgun** - Developer-friendly
- **AWS SES** - Cost-effective at scale
- **Nodemailer with SMTP** - Use your existing email server

## Support

For Resend support: [https://resend.com/docs](https://resend.com/docs)


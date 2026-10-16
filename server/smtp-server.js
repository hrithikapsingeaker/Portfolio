const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Attempt loading .env from server/ or root
const envServerPath = path.join(__dirname, '.env');
const envRootPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envServerPath)) {
  require('dotenv').config({ path: envServerPath });
} else if (fs.existsSync(envRootPath)) {
  require('dotenv').config({ path: envRootPath });
} else {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// SMTP Configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'apsingekarhrithik@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'dheplofttydrxyiv';
const TO_EMAIL = process.env.TO_EMAIL || 'apsingekarhrithik@gmail.com';

let transporterPromise = initTransporter();

async function initTransporter() {
  if (SMTP_PASS && SMTP_PASS.trim() !== '') {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    try {
      await transporter.verify();
      console.log(`[SMTP Service] Connected to SMTP Server (${SMTP_HOST}:${SMTP_PORT}) for ${SMTP_USER}`);
      return { transporter, isTest: false };
    } catch (err) {
      console.warn(`[SMTP Service] Direct SMTP authentication warning: ${err.message}`);
      console.log(`[SMTP Service] Falling back to automated Ethereal test SMTP account for development simulation.`);
    }
  } else {
    console.log(`[SMTP Service] No SMTP_PASS found in environment. Setting up Ethereal test account for safe local testing...`);
  }

  // Create an automated Ethereal test account if credentials are not configured
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`[SMTP Service] Ethereal test SMTP initialized! Emails will be previewable in console.`);
    return { transporter: testTransporter, isTest: true };
  } catch (testErr) {
    console.error(`[SMTP Service] Failed to create test account:`, testErr.message);
    return null;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Hrithik Portfolio SMTP Mailer',
    user: SMTP_USER,
    to: TO_EMAIL,
    configured: Boolean(SMTP_PASS && SMTP_PASS.trim() !== '')
  });
});

// SMTP Status endpoint
app.get('/api/smtp-status', async (req, res) => {
  const instance = await transporterPromise;
  res.json({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    user: SMTP_USER,
    configured: Boolean(SMTP_PASS && SMTP_PASS.trim() !== ''),
    isTestAccount: instance ? instance.isTest : true
  });
});

// Primary Email Send endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      formType = 'General Inquiry',
      name = 'Anonymous Visitor',
      email,
      phone = 'Not provided',
      subject = 'Portfolio Website Submission',
      message = '',
      metadata = {}
    } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const instance = await transporterPromise;
    if (!instance || !instance.transporter) {
      return res.status(500).json({ success: false, error: 'Email transporter is not available.' });
    }

    const { transporter, isTest } = instance;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Format metadata entries into nice HTML rows
    const metadataRows = Object.entries(metadata)
      .map(([key, val]) => {
        const formattedVal = Array.isArray(val) ? val.join(', ') : (typeof val === 'object' ? JSON.stringify(val) : val);
        return `<tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a; width: 35%;">${key}</td>
          <td style="padding: 8px 12px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${formattedVal}</td>
        </tr>`;
      })
      .join('');

    // HTML Body for Hrithik
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #121212; color: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 620px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333333; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #FD6F00 0%, #E05600 100%); padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; color: #ffffff; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
          .content { padding: 28px 24px; }
          .badge { display: inline-block; background: #262626; border: 1px solid #FD6F00; color: #FD6F00; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #222222; border-radius: 8px; overflow: hidden; }
          .message-box { background: #222222; border-left: 4px solid #FD6F00; padding: 16px 20px; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #e5e5e5; white-space: pre-wrap; margin-bottom: 24px; }
          .footer { background: #141414; padding: 16px 24px; text-align: center; font-size: 12px; color: #777777; border-top: 1px solid #262626; }
          .btn-reply { display: inline-block; background: #FD6F00; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Portfolio Inquiry</h1>
            <p>Notification from hrithikapsingekar portfolio</p>
          </div>
          <div class="content">
            <span class="badge">${formType}</span>
            <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #ffffff;">${subject}</h2>
            
            <table class="info-table">
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a; width: 35%;">Sender Name:</td>
                <td style="padding: 8px 12px; color: #ffffff; border-bottom: 1px solid #2a2a2a; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Email:</td>
                <td style="padding: 8px 12px; color: #FD6F00; border-bottom: 1px solid #2a2a2a;"><a href="mailto:${email}" style="color: #FD6F00; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Phone:</td>
                <td style="padding: 8px 12px; color: #ffffff; border-bottom: 1px solid #2a2a2a;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Received At:</td>
                <td style="padding: 8px 12px; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">${timestamp} IST</td>
              </tr>
              ${metadataRows}
            </table>

            <h3 style="color: #FD6F00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Message Content</h3>
            <div class="message-box">${message || '(No detailed message content provided)'}</div>

            <center>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn-reply">Reply to ${name}</a>
            </center>
          </div>
          <div class="footer">
            Delivered via SMTP Mailer Service &bull; Portfolio of Hrithik Apsingekar
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send Notification Email to Hrithik
    const mailOptionsToHrithik = {
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[${formType}] ${subject} - from ${name}`,
      text: `New submission from ${name} (${email}, Phone: ${phone}):\n\nSubject: ${subject}\n\nMessage:\n${message}\n\nReceived: ${timestamp}`,
      html: adminHtml
    };

    const info = await transporter.sendMail(mailOptionsToHrithik);
    let previewUrl = null;
    if (isTest) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[SMTP Service] [TEST EMAIL SENT] Preview URL: ${previewUrl}`);
    } else {
      console.log(`[SMTP Service] Real email dispatched to ${TO_EMAIL} (Message ID: ${info.messageId})`);
    }

    // 2. Send polite confirmation acknowledgment to sender
    try {
      const acknowledgmentHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #333333; margin: 0; padding: 20px; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; overflow: hidden; }
            .hdr { background: #1a1a1a; padding: 24px; text-align: center; border-bottom: 4px solid #FD6F00; }
            .hdr h2 { color: #ffffff; margin: 0; font-size: 22px; }
            .bdy { padding: 24px; line-height: 1.6; }
            .ftr { background: #f2f2f2; padding: 14px; text-align: center; font-size: 12px; color: #777777; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="hdr">
              <h2>Hrithik Apsingekar</h2>
              <p style="color: #FD6F00; margin: 4px 0 0 0; font-size: 14px; font-weight: 600;">Full Stack .NET Developer</p>
            </div>
            <div class="bdy">
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for reaching out through my portfolio website! I have received your <strong>${formType}</strong> request regarding:</p>
              <blockquote style="background: #f8f9fa; border-left: 3px solid #FD6F00; padding: 10px 14px; margin: 12px 0;">
                <em>"${subject}"</em>
              </blockquote>
              <p>I am reviewing your details and will get back to you promptly.</p>
              <p style="margin-top: 24px;">Warm regards,<br>
              <strong>Hrithik Apsingekar</strong><br>
              <span style="color: #666666;">Phone: +91 9356801456<br>Email: apsingekarhrithik@gmail.com</span></p>
            </div>
            <div class="ftr">
              Pune, Maharashtra, India &bull; <a href="https://github.com/hrithikapsingekar" style="color: #FD6F00;">GitHub</a> &bull; <a href="https://www.linkedin.com/in/hrithik-apsingekar-644a8b442/" style="color: #FD6F00;">LinkedIn</a>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Hrithik Apsingekar" <${SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out - Hrithik Apsingekar`,
        html: acknowledgmentHtml
      });
      console.log(`[SMTP Service] Acknowledgment email sent to ${email}`);
    } catch (ackErr) {
      console.warn(`[SMTP Service] Acknowledgment send notice:`, ackErr.message);
    }

    return res.json({
      success: true,
      message: 'Email successfully sent via SMTP!',
      messageId: info.messageId,
      previewUrl: previewUrl || undefined,
      isTestAccount: isTest
    });

  } catch (err) {
    console.error(`[SMTP Service] Send error:`, err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch email via SMTP server.'
    });
  }
});

// Serve static frontend in production if dist/portfolio/browser exists
const clientDistPath = path.join(__dirname, '..', 'dist', 'portfolio', 'browser');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
  console.log(`[Static Service] Serving production build from: ${clientDistPath}`);
}

// Start listening
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Hrithik SMTP Email Service running on port ${PORT}`);
  console.log(`📬 Recipient Email: ${TO_EMAIL}`);
  console.log(`⚙️  SMTP Host: ${SMTP_HOST}:${SMTP_PORT}`);
  console.log(`=================================================`);
});

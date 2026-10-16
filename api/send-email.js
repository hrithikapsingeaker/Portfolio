const nodemailer = require('nodemailer');

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'apsingekarhrithik@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'dheplofttydrxyiv';
const TO_EMAIL = process.env.TO_EMAIL || 'apsingekarhrithik@gmail.com';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const {
      formType = 'General Inquiry',
      name = 'Anonymous Visitor',
      email,
      phone = 'Not provided',
      subject = 'Portfolio Website Submission',
      message = '',
      metadata = {}
    } = req.body || {};

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const metadataRows = Object.entries(metadata)
      .map(([key, val]) => {
        const formattedVal = Array.isArray(val) ? val.join(', ') : (typeof val === 'object' ? JSON.stringify(val) : val);
        return `<tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #a3a3a3; border-bottom: 1px solid #2a2a2a; width: 35%;">${key}</td>
          <td style="padding: 8px 12px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${formattedVal}</td>
        </tr>`;
      })
      .join('');

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
            Delivered via Vercel Serverless &bull; Portfolio of Hrithik Apsingekar
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send Notification to Hrithik
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[${formType}] ${subject} - from ${name}`,
      text: `New submission from ${name} (${email}, Phone: ${phone}):\n\nSubject: ${subject}\n\nMessage:\n${message}\n\nReceived: ${timestamp}`,
      html: adminHtml
    });

    // 2. Acknowledgment to sender
    try {
      await transporter.sendMail({
        from: `"Hrithik Apsingekar" <${SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out - Hrithik Apsingekar`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #333333; margin: 0; padding: 20px;">
            <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; overflow: hidden;">
              <div style="background: #1a1a1a; padding: 24px; text-align: center; border-bottom: 4px solid #FD6F00;">
                <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Hrithik Apsingekar</h2>
                <p style="color: #FD6F00; margin: 4px 0 0 0; font-size: 14px; font-weight: 600;">Full Stack .NET Developer</p>
              </div>
              <div style="padding: 24px; line-height: 1.6;">
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
              <div style="background: #f2f2f2; padding: 14px; text-align: center; font-size: 12px; color: #777777;">
                Pune, Maharashtra, India &bull; <a href="https://github.com/hrithikapsingekar" style="color: #FD6F00;">GitHub</a> &bull; <a href="https://www.linkedin.com/in/hrithik-apsingekar-644a8b442/" style="color: #FD6F00;">LinkedIn</a>
              </div>
            </div>
          </div>
        `
      });
    } catch (ackErr) {
      console.warn('Acknowledgment send notice:', ackErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Email successfully sent via SMTP!',
      messageId: info.messageId
    });

  } catch (err) {
    console.error('Serverless send error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch email.'
    });
  }
};

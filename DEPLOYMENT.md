# Deployment Guide — Hrithik Apsingekar Portfolio

This portfolio website is production-ready. You can deploy it using any of the following options:

---

## 🚀 Option 1: Full-Stack Deployment (Frontend + SMTP Mailer)
**Recommended Platforms:** [Render](https://render.com), [Railway](https://railway.app), or [DigitalOcean App Platform].

In this setup, a single Node.js process runs your Express SMTP server and automatically serves the Angular production build (`dist/portfolio/browser`).

1. **Deploy Repository**: Push your code to GitHub and connect your repo to Render or Railway.
2. **Build Command**:
   ```bash
   npm run build
   ```
3. **Start Command**:
   ```bash
   npm run start:prod
   ```
4. **Environment Variables**:
   Add these in your hosting platform's Environment Settings:
   * `PORT`: `3001` (or provided automatically by the host)
   * `SMTP_HOST`: `smtp.gmail.com`
   * `SMTP_PORT`: `587`
   * `SMTP_USER`: `apsingekarhrithik@gmail.com`
   * `SMTP_PASS`: `dheplofttydrxyiv` (Pre-configured & verified in `.env` and `server/smtp-server.js`)
   * `TO_EMAIL`: `apsingekarhrithik@gmail.com`

---

## ⚡ Option 2: Static Hosting (Vercel / Netlify / GitHub Pages)
If you prefer static hosting for the Angular frontend:

### Vercel (Pre-configured via `vercel.json`)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Framework Preset: **Angular**
3. Build Command: `npm run build`
4. Output Directory: `dist/portfolio/browser`
5. Click **Deploy**. SPA routing and rewrites are pre-configured in `vercel.json`.

### Netlify (Pre-configured via `netlify.toml`)
1. Import your GitHub repository into [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist/portfolio/browser`
4. Click **Deploy**. SPA routing rules are pre-configured in `netlify.toml`.

> **Note on Email**: 
> - **Vercel**: Works automatically out-of-the-box via the included Serverless Function ([`api/send-email.js`](file:///f:/Hrithik/Portfolio%20Website/api/send-email.js)). Add `SMTP_PASS` to your Vercel Environment Variables.
> - **Netlify / GitHub Pages**: Host the lightweight `server/smtp-server.js` on Render/Railway or point to the API URL.

---

## 🏢 Option 3: Windows Server / IIS Deployment
As a .NET developer specializing in IIS:

1. Copy the contents of `dist/portfolio/browser/` to your IIS website root (e.g. `C:\inetpub\wwwroot\portfolio`).
2. The included [`web.config`](file:///f:/Hrithik/Portfolio%20Website/src/web.config) automatically handles:
   * URL rewriting for Angular SPA routing.
   * Proper MIME types for `.webp` and `.json`.
3. To run the SMTP backend, run `node server/smtp-server.js` as a Windows Service (via NSSM or PM2), or reverse proxy `/api` requests through IIS URL Rewrite or IISnode.

---

## 📦 Production Build Specs
* **Bundle size**: ~447 kB raw (~108 kB gzipped transfer)
* **Assets**: All transparent profile images and official resume PDF are optimized and bundled in `/assets`.

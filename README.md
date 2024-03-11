<h1 align="center">
  Social
</h1>

<p align="center">
 <a href="#introduction">Introduction</a> •
 <a href="#features">Features</a> •
 <a href="#how-to">How to run it</a> •
 <a href="#tech-stack">Tech stack</a> •
 <a href="#author">Author</a> •
 <a href="#license">License</a>
</p>

## 📖 Introduction

Social was built on the idea that anyone, anywhere in the world can share
and monetize their passions. Our vision: a world where passions create connections across
continents.
Made with [Blitz](https://github.com/blitz-js/blitz).

---

## 📦 Features

- [x] Authentication and Authorization
- [x] Multi-tenancy
- [x] Payments Integration [Lemon Squeezy](https://docs.lemonsqueezy.com/api#test-mode)
- [ ] Event Monitoring [Log Snag](https://logsnag.com/)
- [ ] Subscriptions [Subscriptions](https://docs.lemonsqueezy.com/api/subscriptions)
- [ ] Subscription plans
- [x] User Roles
- [ ] Notifications
    - [x] Email using [Resend](https://resend.com/) and [React Email](https://react.email/)
      - [x] Welcome Email 
      - [x] Forgot Password
      - [x] Password Reset
      - [x] Contact Email
    - [x] Email testing using [Nodemailer](https://nodemailer.com/about/)
    - [ ] Discord
    - [ ] Browser / in-app
- [x] Admin Panel
- [ ] Announcements
- [ ] Invite system
- [ ] Cron jobs
---

## 🛠️ How to run it

Clone Project
```bash
git clone https://github.com/colburncodes/social.git
```
Navigate to project directory
```bash
cd social
```
Install dependencies
```bash
npm install
```
Create a `.env` file in root directory
```
DATABASE_URL="yourDBurl"
RESEND_API_KEY="resendAPIKey"
NODE_MAILER_USER="nodeMailerCreds"
NODE_MAILER_PASS="nodeMailerCreds"
UPLOADTHING_SECRET="uploadSecretKey"
UPLOADTHING_APP_ID="uploadAPPID"
```
Start the server
```bash
npm run dev
```
Start Prisma Studio
```bash
npm run studio
```

## Tech Stack

The following tools were used in the construction of the project:

- **[mantine](https://ui.mantine.dev/)**
- **[blitz](https://github.com/blitz-js/blitz)**
- **[prisma](https://www.prisma.io/nextjs)**
- **[postgresql](https://www.postgresql.org/)**
- **[railway](https://railway.app/)**

---

## Author

<a href="https://www.whocolburn.com">
  <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/71975541?v=4" width="100px;" alt="who colburn"/>
  <br />
  <b>Colburn</b>
</a>
 <br />

---

## License

This project is under the license [MIT](./LICENSE).

Made with ❤ by Colburn 👋🏽 [Get in Touch!](mailto:hello@whocolburn.com)

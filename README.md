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
- [x] Event Monitoring [Log Snag](https://logsnag.com/)
    - [ ] Billing
    - [ ] Orders
    - [x] User activity
- [ ] Subscriptions [Subscriptions](https://docs.lemonsqueezy.com/api/subscriptions)
- [ ] Subscription plans
- [x] User Roles
- [ ] Notifications
    - [x] Email prod env using [Resend](https://resend.com/) and [React Email](https://react.email/)
      - [x] Welcome Email 
      - [x] Forgot Password
      - [x] Password Reset
      - [x] Contact Email
    - [ ] Email staging env using [MailTrap](https://api-docs.mailtrap.io/docs/mailtrap-api-docs/5tjdeg9545058-mailtrap-api)
    - [x] Email testing env using [Nodemailer](https://nodemailer.com/about/)
    - [ ] Discord
    - [ ] Browser / in-app
- [x] Admin Panel
- [ ] Announcements
- [ ] Invite system
- [ ] Cron jobs
- [x] Testing - [Vitest](https://vitest.dev/)
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
DATABASE_URL
RESEND_API_KEY
NODE_MAILER_USER
NODE_MAILER_PASS
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
LEMONSQUEEZY_WEBHOOK_SECRET
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_VARIANT_ID
LOGSNAG_API_KEY
NEXT_PUBLIC_LOGSNAG_CLIENT_TOKEN
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

Welcome to Next-passwordless-boilerplate

This is minimalistic auth system based on Next.js fullstack serverless project.

You need to have a mail server and mongoDB to use it !

try it here : https://next-passwordless-boilerplate.vercel.app/

Dependencies (outside react) :

- cookie: ^0.4.1,
- jsonwebtoken: ^8.5.1,
- mongodb: ^4.0.1,
- nanoid: ^3.1.23,
- next: 11.0.1,
- nodemailer: ^6.6.3,
- ramda: ^0.27.1,

## Getting Started

First, install dependencies:

```bash
npm install
```

After, add an .env.local file in the root of the project and don't forget to write yours :

- MONGODB_URI
- MONGODB_DB
- EMAIL_PROVIDER
- EMAIL_USER
- EMAIL_PASSWORD
- EXPIRATION_LONG
- EXPIRATION_SHORT
- JWT_SECRET
- URL_PROD
- URL_DEV
- ENVIRONMENT=DEV

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

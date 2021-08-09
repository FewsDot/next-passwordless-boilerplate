Welcome to Next-passwordless-boilerplate

This is minimalistic auth system based on Next.js fullstack serverless project.

You need to have a mail server and mongoDB to use it !

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

MONGODB_URI
MONGODB_DB
EMAIL_SERVER_USER
EMAIL_SERVER_PASSWORD
EMAIL_SERVER_HOST
EMAIL_SERVER_PORT
EMAIL_FROM
EXPIRATION_LONG
EXPIRATION_SHORT
JWT_SECRET
NEXT_PUBLIC_URL_PROD
NEXT_PUBLIC_URL_DEV=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=DEV

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

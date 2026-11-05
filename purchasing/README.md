This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

From the repository root, start the unified shop and cart app:

```bash
cd purchasing
npm run dev
```

Open the localized shop and cart routes in the same app:

- Shop: `http://localhost:3000/en/shop`, `http://localhost:3000/te/shop`, or `http://localhost:3000/hi/shop`
- Cart: `http://localhost:3000/en/cart`, `http://localhost:3000/te/cart`, or `http://localhost:3000/hi/cart`

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Shop and cart routes

The shop and cart share this Next.js app and one dev server:

- `/en/shop`, `/te/shop`, `/hi/shop`
- `/en/cart`, `/te/cart`, `/hi/cart`

The shop loads its products from the Express backend. Start the backend from `saree-backend` with `npm run dev`; it listens on port `5000` by default. To use a different backend address, set `SAREE_API_URL`, for example `http://localhost:5000`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

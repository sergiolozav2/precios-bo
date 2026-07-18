# PrecioBO

Price search and comparison for stores in Bolivia.

![Demo PrecioBo](https://raw.githubusercontent.com/sergiolozav2/precios-bo/67d2985cc7904a5e00a6feef1c74aff43da3f3c3/docs/intro.gif)

## Setup

```bash
npm install
npm run dev:pages
```

The app runs at `http://localhost:8788`. This starts both the frontend and the
Pages Functions.

For frontend-only work with hot reload:

```bash
npm run dev
```

## Commands

```bash
npm test
npm run lint
npm run build
```

## Core tools

React, TypeScript, Vite, Tailwind CSS, TanStack Query, Cloudflare Pages, and
Vitest.

## Deploy to Cloudflare Pages

Wrangler is installed locally with `npm install`. Sign in to Cloudflare once:

```bash
npx wrangler login
```

If the Pages project does not exist yet, create it once:

```bash
npx wrangler pages project create preciobo --production-branch main
```

Build and deploy:

```bash
npm run build
npx wrangler pages deploy dist --project-name preciobo
```

Retailer endpoints can be overridden with `DISMAC_SEARCH_URL`,
`HIPERMAXI_SEARCH_URL`, `GENIOX_SEARCH_URL`, and `ICNORTE_SEARCH_URL` in the
Cloudflare Pages environment variables.

# PrecioBO

React price-search frontend with a Cloudflare Pages Function API.

## Local development

Install dependencies and run the production-shaped Pages environment:

```bash
npm install
npm run dev:pages
```

Wrangler serves the built SPA and the `functions/` routes at
`http://localhost:8788`.

For frontend-only development with Vite hot reload:

```bash
npm run dev
```

The Vite-only server does not execute Pages Functions.

## API

```text
GET /api/search_products/products?search=<query>
```

The response keeps successful retailer results even when another retailer fails:

```json
{
  "items": [],
  "errors": [
    {
      "source": "Dismac",
      "message": "Retailer error"
    }
  ]
}
```

The Pages Function currently uses the Dismac and Hipermaxi services. Set
`DISMAC_SEARCH_URL` or `HIPERMAXI_SEARCH_URL` in `.dev.vars` or the Cloudflare
Pages environment when either API URL differs from its legacy default. These
overrides also make it possible to validate the complete Function locally
against deterministic fixture servers.

## Validation

```bash
npm test
npm run lint
npm run build
npx wrangler pages functions build
```

The unit tests call the retailer service implementations through small injected
clients; they do not require Fastify, Supertest, MSW, or live retailer requests.

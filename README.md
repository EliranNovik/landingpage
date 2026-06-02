# Decker Pex & Co. Law Office — Landing Page

Professional landing page for **Decker Pex & Co. Law Office**, featuring legal, notarial, translation, and document acquisition services. Includes a contact form connected to a Node.js/Express API.

## Tech Stack

| Layer    | Technologies                                      |
| -------- | ------------------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui  |
| Backend  | Node.js, Express, TypeScript                      |
| Icons    | lucide-react                                      |

## Project Structure

```txt
new_landingpage_dp/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI and page sections
│       ├── data/           # Services and content data
│       └── lib/            # Utilities (cn helper)
├── server/                 # Express API
│   └── src/
│       ├── controllers/
│       └── routes/
├── package.json            # Root helper scripts
└── README.md
```

## Installation

From the project root, install dependencies for both client and server:

```bash
npm run install:all
```

Or install each package separately:

```bash
cd client && npm install
cd ../server && npm install
```

## Running the Application

You need **two terminals** — one for the API and one for the frontend.

### 1. Start the backend (port 3005)

```bash
cd server
npm run dev
```

### 2. Start the frontend (port 5174)

```bash
cd client
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

If port 5174 is already in use, stop the other Vite process first, then run `npm run dev` again.

The Vite dev server proxies `/api` requests to `http://localhost:3005`.

## API

### `POST /api/contact`

Accepts JSON:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "facts": "string"
}
```

`phone` includes the country dial code (e.g. `+972501234567`).

**Validation**

- `name` — required
- `email` — required, valid email format
- `phone` — required (full number with country code)
- `facts` — optional inquiry details

**Success response (200)**

```json
{
  "success": true,
  "message": "Inquiry received successfully"
}
```

Valid submissions are forwarded to the Leadify CRM webhook (`POST` `application/json`):

- Default URL: `https://leadify-crm-backend.onrender.com/api/hook/catch`
- Override with `LEAD_WEBHOOK_URL` in the server environment

Webhook body includes `source_code: "1"` by default (override with `LEAD_SOURCE_CODE` on the server).

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "facts": "string",
  "source_code": "1"
}
```

If the webhook fails, the API returns **502** and the form shows an error.

### `GET /api/health`

Health check endpoint.

## Production Build

```bash
cd client && npm run build
cd ../server && npm run build && npm start
```

Serve the `client/dist` folder with your preferred static host and run the Express server for API routes (configure reverse proxy for `/api`).

## Page Sections

1. **Hero** — Split layout: firm info + contact form
2. **Our Services** — Service cards grid
3. **How It Works** — Four-step process
4. **Why Choose Us** — Trust-building cards
5. **Contact CTA** — Scroll-to-form call to action

## License

Private project for Decker Pex & Co. Law Office.

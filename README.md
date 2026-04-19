# Kian Thai (เขียนไทย)

A web-based interactive tracing engine designed to help children practice and master Thai handwriting. 
https://kianthai.songthamtung.workers.dev/

Used Lovable to generate the initial code. Then added the Thai tracing font Layiji_kutlaimuu2_02.ttf.

## 🚀 Tech Stack

This project is built using a modern, Server-Side Rendered (SSR) architecture optimized for edge deployment:
* **Framework:** React + Vite
* **Routing:** TanStack Router (File-based routing)
* **Styling:** Tailwind CSS / shadcn/ui
* **Deployment:** Cloudflare Pages
* **Package Management:** npm 

## 🛠️ Local Development

To run the tracing engine locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Songthamt/kianthai.git](https://github.com/Songthamt/kianthai.git)
   cd kianthai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the `localhost` URL provided in the terminal.

## 📦 Deployment (Cloudflare Pages)

This project is configured for automated edge deployment via Cloudflare Pages using the `wrangler.jsonc` configuration.

## 📂 Project Structure

* `/src/routes/` - TanStack file-based routing components.
* `/src/components/` - Reusable UI components and tracing logic.
* `/public/` - Static assets, including Thai tracing fonts (e.g., `Layiji_kutlaimuu2_02.ttf`).
* `vite.config.ts` - Vite configuration (Lovable/TanStack preset).
* `wrangler.jsonc` - Cloudflare edge routing and server configuration.
# DepositBack

AI-powered tenant demand letter generator for Canada.

## Deploy to Vercel in 5 minutes

### Step 1 — Install Vercel CLI
```
npm install -g vercel
```

### Step 2 — Deploy
```
cd depositback
vercel
```
Follow the prompts (link to your account, create new project, all defaults).

### Step 3 — Add your API key
Go to: https://vercel.com → Your Project → Settings → Environment Variables

Add:
- Key: `ANTHROPIC_API_KEY`
- Value: your key from platform.anthropic.com

### Step 4 — Redeploy
```
vercel --prod
```

Done. Your site is live at `your-project.vercel.app`.

### Add custom domain (depositback.ca)
Vercel Dashboard → Your Project → Settings → Domains → Add `depositback.ca`
Then update your DNS at Namecheap to point to Vercel.

## Add Stripe payments
In `pages/index.js`, change the generate button to redirect to your Stripe Payment Link first.
On Stripe success, redirect back to `/?paid=true` and the app auto-generates.

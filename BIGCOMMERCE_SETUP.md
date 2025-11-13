# BigCommerce Integration Setup Guide

This guide will help you connect your SIS website frontend to your BigCommerce store.

## Prerequisites

- Active BigCommerce store
- Admin access to BigCommerce
- Store set up with products and categories

## Step 1: Create API Credentials

1. Log in to your BigCommerce admin panel
2. Go to **Settings → API → API Accounts**
3. Click **"Create API Account"**
4. Select **"Create V2/V3 API Token"**
5. Fill in:
   - **Name**: "SIS Frontend Integration"
   - **OAuth Scopes**:
     - Products: **Read-only**
     - Catalog: **Read-only**
     - Carts: **Modify**
     - Checkouts: **Modify**
     - Orders: **Read-only** (optional)
     - Customers: **Read-only** (optional)
6. Click **Save**
7. Copy the credentials (you won't see them again!)

## Step 2: Create Storefront API Token

1. Go to **Settings → API → Storefront API**
2. Click **"Create Token"**
3. Fill in:
   - **Token Name**: "SIS Frontend"
   - **Channel**: Select your sales channel (usually "Default")
   - **Allowed CORS Origins**: Add your domain (e.g., `https://sisupplies.co.uk`)
4. Click **Save**
5. Copy the token

## Step 3: Configure Environment Variables

### For Vercel Deployment

Add these as environment variables in your Vercel project settings:

**IMPORTANT: These are SERVER-SIDE ONLY. Do NOT use NEXT_PUBLIC_ prefix.**

\`\`\`
BC_STORE_HASH=xrcsa1wme9
BC_STOREFRONT_TOKEN=your_token_here
BC_API_URL=https://sisb2c.mybigcommerce.com
BC_GRAPHQL_URL=https://store-xrcsa1wme9.mybigcommerce.com/graphql
BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
BC_CHANNEL_ID=1

NEXT_PUBLIC_BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
NEXT_PUBLIC_BC_STORE_URL=https://sisb2c.mybigcommerce.com
\`\`\`

### For Local Development

Create a \`.env.local\` file:

\`\`\`bash
BC_STORE_HASH=xrcsa1wme9
BC_STOREFRONT_TOKEN=your_token_here
BC_API_URL=https://sisb2c.mybigcommerce.com
BC_GRAPHQL_URL=https://store-xrcsa1wme9.mybigcommerce.com/graphql
BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
BC_CHANNEL_ID=1

NEXT_PUBLIC_BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
NEXT_PUBLIC_BC_STORE_URL=https://sisb2c.mybigcommerce.com
\`\`\`

## Security Notes

⚠️ **NEVER** commit your `.env.local` or `.env.production` files to Git!

⚠️ **NEVER** use `NEXT_PUBLIC_` prefix for sensitive tokens - they will be exposed to the client!

✅ All BigCommerce API calls are made server-side using Server Actions
✅ Cart ID is stored in HTTP-only cookies for security
✅ No sensitive credentials are exposed to the browser

## Step 4: Map Your Categories

Ensure your BigCommerce categories match the navigation:

- Hi Vis Workwear
- Flame Retardant
- Footwear
- Personal Protective Equipment
- Corporate Clothing
- Women's Workwear
- Sustainable Workwear
- Clearance

## Step 5: Product Requirements

Each product in BigCommerce should have:

1. **Required Fields**:
   - Product Name
   - SKU
   - Price
   - Category
   - Brand (use Brand field in BC)
   - Description
   - Images

2. **Custom Fields** (optional):
   - Sizes
   - Fabric
   - Certifications
   - Any specifications

## Step 6: Test the Integration

1. Run `npm run dev`
2. Visit `/test-bigcommerce` to verify connection
3. Check products load on homepage
4. Test "Add to Cart" functionality
5. Test checkout redirect

## Checkout Flow

The frontend uses BigCommerce's hosted checkout:

1. User adds products to cart
2. Cart is managed via Server Actions
3. Cart ID stored in HTTP-only cookie
4. Click "Checkout" redirects to BigCommerce checkout
5. BigCommerce handles payment, shipping, etc.
6. After purchase, redirect back to your site

## Deployment on Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Important**: Make sure to add ALL environment variables listed in Step 3 to your Vercel project settings.

## Troubleshooting

### Products not loading
- Check `BC_STORE_HASH` is correct
- Verify Storefront API token has correct permissions
- Check server logs for API errors

### Add to Cart not working
- Ensure Cart API scope is enabled
- Check cookie settings in browser
- Verify product has valid BigCommerce ID

### Checkout redirect fails
- Verify `BC_CHECKOUT_URL` is correct
- Ensure cart has valid checkout URL
- Check CORS settings in BigCommerce

## Need Help?

Contact BigCommerce support or check:
- https://developer.bigcommerce.com/
- https://support.bigcommerce.com/
\`\`\`

Delete the old cart.ts file as it's no longer needed:

```typescriptreact file="lib/bigcommerce/cart.ts" isDeleted="true"
...deleted...

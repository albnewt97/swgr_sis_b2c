# Deployment Guide - SIS B2C Portal

## 🚀 Quick Start: Deploy to Vercel

### Option 1: Deploy Full Website

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository: `sis-b2c-portal`

3. **Configure Environment Variables**
   
   In Vercel dashboard, add these environment variables:
   
   \`\`\`
   BC_STORE_HASH=xrcsa1wme9
   BC_STOREFRONT_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGc...
   BC_API_URL=https://sisb2c.mybigcommerce.com
   BC_GRAPHQL_URL=https://store-xrcsa1wme9.mybigcommerce.com/graphql
   BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
   BC_CHANNEL_ID=1
   
   NEXT_PUBLIC_BC_CHECKOUT_URL=https://sisb2c.mybigcommerce.com
   NEXT_PUBLIC_BC_STORE_URL=https://sisb2c.mybigcommerce.com
   
   COMING_SOON_MODE=false
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

---

### Option 2: Deploy Coming Soon Page Only

**Perfect for launching your domain before the full site is ready!**

1. **Follow steps 1-2 from Option 1**

2. **Configure Environment Variables**
   
   Add ONLY these variables (minimal setup):
   
   \`\`\`
   COMING_SOON_MODE=true
   \`\`\`
   
   You can add the BigCommerce variables later when ready to launch.

3. **Deploy**
   - Click "Deploy"
   - Your coming soon page will be live!

---

## 🔄 Switching Between Coming Soon and Full Website

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Find \`COMING_SOON_MODE\`
3. Change value:
   - \`true\` = Show coming soon page
   - \`false\` = Show full website
4. Go to Deployments tab
5. Click "Redeploy" on the latest deployment

**Changes take effect in ~30 seconds!**

---

## 🌐 Custom Domain Setup

### Add Your Domain to Vercel:

1. In Vercel project, go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain: \`sisupplies.co.uk\`
4. Follow DNS instructions:

   **For Cloudflare/most DNS providers:**
   \`\`\`
   Type: CNAME
   Name: @ (or your subdomain)
   Value: cname.vercel-dns.com
   \`\`\`

5. Wait for DNS propagation (5-60 minutes)
6. Your site will be live on your domain! ✅

---

## 📧 Email Signup Integration (Optional)

The coming soon page has an email form. To collect emails:

### Option A: Use Vercel Forms (Free)

1. Add this to your environment variables:
   \`\`\`
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   \`\`\`

2. Sign up at [formspree.io](https://formspree.io)
3. Create a form and get your form ID
4. Update the coming soon page form action

### Option B: Use Mailchimp/ConvertKit

1. Get your API endpoint from Mailchimp/ConvertKit
2. Update the form submission handler in \`app/coming-soon/page.tsx\`
3. Add API keys to environment variables

---

## 🔒 Security Checklist

Before going live:

- [x] All sensitive tokens are server-side only (no \`NEXT_PUBLIC_\` prefix)
- [x] Environment variables added in Vercel
- [x] HTTPS enabled (automatic with Vercel)
- [x] Custom domain connected
- [x] CORS configured in BigCommerce (if using full site)
- [x] Test checkout flow (if using full site)

---

## 🐛 Troubleshooting

### Coming Soon Page Not Showing
- Check \`COMING_SOON_MODE=true\` in Vercel environment variables
- Redeploy the project
- Clear browser cache (Ctrl+Shift+R)

### Full Website Not Working
- Verify all BigCommerce environment variables are set
- Check \`COMING_SOON_MODE=false\`
- Test at \`/test-bigcommerce\` to verify API connection

### Domain Not Working
- Wait 1 hour for DNS propagation
- Verify CNAME record is correct
- Check domain status in Vercel dashboard

---

## 📊 Analytics (Recommended)

Add Google Analytics or Vercel Analytics:

1. In Vercel project → Settings → Analytics
2. Enable "Vercel Analytics" (free)
3. Or add Google Analytics:
   \`\`\`
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`

---

## 🎯 Launch Checklist

### Pre-Launch (Coming Soon Mode):
- [ ] Deploy to Vercel with \`COMING_SOON_MODE=true\`
- [ ] Connect custom domain
- [ ] Test on mobile and desktop
- [ ] Setup email collection
- [ ] Add Google Analytics

### Full Launch:
- [ ] Add all BigCommerce environment variables
- [ ] Test product pages
- [ ] Test add to cart
- [ ] Test checkout flow
- [ ] Change \`COMING_SOON_MODE=false\`
- [ ] Redeploy
- [ ] Announce launch! 🚀

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Contact: orders@sisupplies.co.uk

---

**Pro Tip:** Keep \`COMING_SOON_MODE=true\` until you're 100% ready. You can always deploy the full site later by just changing one variable!

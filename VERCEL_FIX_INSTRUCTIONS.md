# Vercel 404 Error Fix Instructions

## Problem
All routes are returning 404 errors because Vercel doesn't know where the Next.js app is located in your monorepo.

## Solution: Set Root Directory in Vercel Dashboard

### Step-by-Step Instructions

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard

2. **Select Your Project**
   - Click on the `realestate` project

3. **Open Settings**
   - Click **Settings** in the top navigation bar

4. **Go to General Settings**
   - Click **General** in the left sidebar

5. **Find Root Directory**
   - Scroll down to the "Root Directory" section

6. **Edit Root Directory**
   - Click the **Edit** button next to "Root Directory"

7. **Set the Path**
   - Enter: `realestate/frontend`
   - Click **Save**

8. **Redeploy**
   - Go to the **Deployments** tab
   - Find the latest deployment
   - Click the **...** (three dots) menu
   - Click **Redeploy**
   - Select **Use existing Build Cache** (optional, faster)
   - Click **Redeploy**

9. **Wait for Deployment**
   - The deployment should complete in 30-60 seconds
   - All routes should now work correctly

## What This Does

Setting the Root Directory tells Vercel:
- Where to find your `package.json`
- Where to find your Next.js app
- Where to run build commands from

## Expected Result

After redeployment, these routes should work:
- ✅ `/` - Landing page
- ✅ `/dashboard` - Property dashboard
- ✅ `/properties/[id]` - Property details
- ✅ `/api/v1/health` - Health check API
- ✅ `/api/v1/properties` - Property search API
- ✅ `/api/v1/properties/[id]` - Property detail API

## Alternative: Move Next.js to Root

If you prefer a simpler structure, I can restructure the project to move the Next.js app to the root directory. This eliminates the need for Root Directory configuration entirely.

Let me know if you'd like me to do this instead!


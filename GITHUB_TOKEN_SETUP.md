# 🔧 GitHub API Rate Limit Solution

## Problem
You're hitting GitHub's API rate limit (60 requests/hour for unauthenticated requests).

## Solution
Add a GitHub Personal Access Token to increase the limit to 5,000 requests/hour.

## Quick Setup Steps

### 1. Create GitHub Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name like "Portfolio API"
4. Select **Expiration**: No expiration (or 1 year)
5. Select **Scopes**: Only check `public_repo`
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

### 2. Add Token to Your Portfolio
1. Open your `.env.local` file (in the portfolio root folder)
2. Replace `your_github_token_here` with your actual token:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_actual_token_here
   ```
3. Save the file

### 3. Restart Development Server
```bash
npm run dev
```

## Alternative: Using Fallback Data
If you don't want to use a token, the portfolio will automatically use fallback project data when the API is rate limited. The featured projects are:

- **Aurora Alarm Clock** - React Native alarm app
- **BrainiX** - AI brain training app  
- **Horizon Banking** - Modern banking platform

## Verification
After adding the token, check the browser console - you should no longer see rate limit errors.

## Security Note
The token is prefixed with `NEXT_PUBLIC_` which means it's exposed to the browser. This is safe for public repositories with `public_repo` scope only. Never add sensitive scopes like `repo` (private repos) or admin permissions.
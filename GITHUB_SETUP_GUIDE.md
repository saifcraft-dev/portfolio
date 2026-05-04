# GitHub Setup & Integration Guide for DevStudio

This guide walks you through creating a GitHub account, setting up Git, pushing your DevStudio project to a GitHub repository, and optionally deploying it automatically via Vercel.

---

## Table of Contents

1. [What Is GitHub and Why Use It?](#1-what-is-github-and-why-use-it)
2. [Create a GitHub Account](#2-create-a-github-account)
3. [Set Up Git on Your Computer](#3-set-up-git-on-your-computer)
4. [Configure Git with Your Identity](#4-configure-git-with-your-identity)
5. [Create a New Repository on GitHub](#5-create-a-new-repository-on-github)
6. [Connect Your DevStudio Project to GitHub](#6-connect-your-devstudio-project-to-github)
7. [Push Your Code to GitHub](#7-push-your-code-to-github)
8. [Protect Your Secrets (.env file)](#8-protect-your-secrets-env-file)
9. [Keeping Your Code Up to Date](#9-keeping-your-code-up-to-date)
10. [Connect GitHub to Vercel for Auto-Deploy](#10-connect-github-to-vercel-for-auto-deploy)
11. [Set Environment Variables in Vercel](#11-set-environment-variables-in-vercel)
12. [GitHub Actions: Auto CI/CD (Optional)](#12-github-actions-auto-cicd-optional)
13. [Useful Git Commands Cheat Sheet](#13-useful-git-commands-cheat-sheet)
14. [Troubleshooting Common Issues](#14-troubleshooting-common-issues)

---

## 1. What Is GitHub and Why Use It?

**GitHub** is a cloud platform for storing and managing code using **Git** — a version control system. Here is why you should use it for your DevStudio project:

| Benefit | Description |
|---|---|
| **Version history** | Every change you make is saved. You can roll back to any previous state. |
| **Backup** | Your code is stored safely in the cloud, not just on your machine. |
| **Collaboration** | Others (teammates, freelancers) can contribute to your project. |
| **Deployment** | Connect to Vercel, Netlify, or other platforms to auto-deploy on every push. |
| **Portfolio** | Public repositories show your work to potential employers or clients. |

---

## 2. Create a GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click **Sign up** in the top right corner.
3. Enter your **email address**, create a **password**, and choose a **username**.
   - Your username will appear in your repository URLs (e.g., `github.com/yourusername/devstudio`)
   - Choose something professional if you plan to share your portfolio publicly.
4. Complete the verification puzzle.
5. Choose the **Free** plan (it gives you unlimited public and private repositories).
6. GitHub will send a **verification email** — open it and click the confirmation link.
7. You're in! You now have a GitHub account.

---

## 3. Set Up Git on Your Computer

Git must be installed on your local machine before you can use it.

### Check if Git is already installed

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
git --version
```

If you see something like `git version 2.x.x`, Git is already installed. Skip to Step 4.

### Install Git

**Windows:**
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer.
3. Keep all default settings during installation.
4. After installation, open **Git Bash** (installed alongside Git) for all Git commands.

**macOS:**
1. Open Terminal and run:
   ```bash
   xcode-select --install
   ```
2. A dialog will appear — click **Install**.
3. Alternatively, install via Homebrew:
   ```bash
   brew install git
   ```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

---

## 4. Configure Git with Your Identity

Git needs to know who you are so it can label your commits (saved changes) correctly.

Run these two commands in your terminal, replacing the values with your own:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

> Use the **same email address** you registered with on GitHub.

Verify your configuration:

```bash
git config --list
```

You should see your name and email listed.

---

## 5. Create a New Repository on GitHub

A **repository** (or "repo") is a folder on GitHub that holds your project.

1. Log in to [https://github.com](https://github.com).
2. Click the **+** icon in the top right corner → **New repository**.
3. Fill in the details:
   - **Repository name:** `devstudio` (or any name you prefer)
   - **Description:** `DevStudio - Full-stack digital agency portfolio site`
   - **Visibility:** Choose **Private** (recommended, since your project contains API keys and admin features) or **Public** if you want it visible to the world.
   - **DO NOT** check "Add a README file" or "Add .gitignore" — your project already has these.
4. Click **Create repository**.
5. GitHub will show you a page with setup commands. **Keep this page open** — you will use it in the next step.

---

## 6. Connect Your DevStudio Project to GitHub

### If you are working in Replit

Your project already has a Git repository initialized (the `.git` folder exists). You just need to point it at your new GitHub repository.

Open the Replit **Shell** tab and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/devstudio.git
```

Replace `YOUR_USERNAME` with your actual GitHub username and `devstudio` with your repository name.

Verify the remote was added:

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/devstudio.git (fetch)
origin  https://github.com/YOUR_USERNAME/devstudio.git (push)
```

### If you are working locally on your computer

Navigate to your project folder in the terminal:

```bash
cd path/to/your/devstudio-folder
```

Initialize Git (if not already done):

```bash
git init
```

Add your GitHub repository as the remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/devstudio.git
```

---

## 7. Push Your Code to GitHub

This uploads all your project files to GitHub.

### Step 1 — Stage all files

```bash
git add .
```

This tells Git to track all files in the project (except those listed in `.gitignore`).

### Step 2 — Create your first commit

```bash
git commit -m "Initial commit: DevStudio full-stack portfolio site"
```

### Step 3 — Set the default branch name

```bash
git branch -M main
```

### Step 4 — Push to GitHub

```bash
git push -u origin main
```

Git will prompt you for your GitHub **username** and **password**.

> **Important:** GitHub no longer accepts your account password here. You need to use a **Personal Access Token** instead.

### Creating a Personal Access Token (PAT)

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name like `DevStudio Replit`
4. Set **Expiration** to `90 days` or `No expiration`
5. Check the **repo** checkbox (gives full control of repositories)
6. Click **Generate token**
7. **Copy the token immediately** — GitHub only shows it once!
8. When Git asks for your password, paste this token instead.

After the push succeeds, refresh your GitHub repository page — your code will be there!

---

## 8. Protect Your Secrets (.env file)

Your DevStudio project uses many API keys (Firebase, Cloudinary, Gemini). These must **never** be uploaded to GitHub.

### Check your .gitignore

Your project already has a `.gitignore` file. Make sure it includes the `.env` file:

```
node_modules
dist
.DS_Store
.env
.env.local
.env.production
```

If `.env` is not listed, add it:

```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### Your required environment variables (for reference only — never commit these)

```
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_ADMIN_EMAILS=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# AI Chatbot
VITE_GEMINI_API_KEY=
```

Store these securely in your hosting platform's environment variable settings (covered in Step 11).

---

## 9. Keeping Your Code Up to Date

Every time you make changes to your project, you need to push them to GitHub.

### The standard workflow

```bash
# 1. Check what files have changed
git status

# 2. Stage your changes
git add .

# 3. Commit with a descriptive message
git commit -m "Add new portfolio project cards"

# 4. Push to GitHub
git push
```

### Good commit message examples

| Commit Message | What it means |
|---|---|
| `Add contact form validation` | New feature added |
| `Fix chatbot response delay` | Bug fixed |
| `Update homepage hero section` | UI update |
| `Remove unused components` | Cleanup |

### Pull changes (if working with a team or from multiple machines)

```bash
git pull origin main
```

---

## 10. Connect GitHub to Vercel for Auto-Deploy

Your project already has a `vercel.json` configuration file, making it ready to deploy on Vercel. Every time you push code to GitHub, Vercel will automatically rebuild and redeploy your site.

### Steps

1. Go to [https://vercel.com](https://vercel.com) and click **Sign Up**.
2. Click **Continue with GitHub** and authorize Vercel.
3. Click **Add New** → **Project**.
4. Find your `devstudio` repository in the list and click **Import**.
5. Vercel will auto-detect your settings from `vercel.json`:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
6. Before clicking Deploy, add your environment variables (see Step 11).
7. Click **Deploy**.

Your site will be live at a URL like `https://devstudio-xyz.vercel.app`.

You can also add a **custom domain** in Vercel's project settings → Domains.

---

## 11. Set Environment Variables in Vercel

Since your `.env` file is not pushed to GitHub (for security), you must add all environment variables directly in Vercel.

1. In your Vercel project, go to **Settings** → **Environment Variables**.
2. Add each variable one by one:

| Variable Name | Where to find it |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project Settings → Your apps |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Console → Project Settings |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Console → Project Settings |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Console → Project Settings |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Project Settings |
| `VITE_FIREBASE_APP_ID` | Firebase Console → Project Settings |
| `VITE_ADMIN_EMAILS` | Your admin email(s), comma-separated |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → API Keys |
| `VITE_GEMINI_API_KEY` | Google AI Studio → [aistudio.google.com](https://aistudio.google.com) |

3. Set **Environment** to `Production`, `Preview`, and `Development` for each.
4. Click **Save**.
5. Redeploy the project: **Deployments** → click the latest → **Redeploy**.

---

## 12. GitHub Actions: Auto CI/CD (Optional)

GitHub Actions lets you run automated checks (like linting or building) every time you push code. This is useful if you want to make sure the build never breaks.

Create the file `.github/workflows/ci.yml` in your project:

```yaml
name: CI Build Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_CLOUDINARY_CLOUD_NAME: ${{ secrets.VITE_CLOUDINARY_CLOUD_NAME }}
          VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
          VITE_ADMIN_EMAILS: ${{ secrets.VITE_ADMIN_EMAILS }}
```

### Add secrets to GitHub

1. Go to your repository on GitHub.
2. Click **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. Add each environment variable (same ones from Step 11).

Now every push to `main` will trigger an automatic build check. If it fails, GitHub will notify you by email.

---

## 13. Useful Git Commands Cheat Sheet

```bash
# --- SETUP ---
git init                         # Initialize a new git repo
git clone <url>                  # Clone a repo from GitHub to your machine
git remote add origin <url>      # Link local repo to GitHub remote

# --- DAILY WORKFLOW ---
git status                       # See which files have changed
git add .                        # Stage all changes
git add <file>                   # Stage a specific file
git commit -m "message"          # Save staged changes with a message
git push                         # Upload commits to GitHub
git pull                         # Download latest changes from GitHub

# --- BRANCHES ---
git branch                       # List all branches
git branch feature-name          # Create a new branch
git checkout feature-name        # Switch to a branch
git checkout -b feature-name     # Create and switch in one command
git merge feature-name           # Merge a branch into current branch

# --- HISTORY & UNDO ---
git log --oneline                # See commit history (compact)
git diff                         # See unstaged changes
git stash                        # Temporarily save uncommitted changes
git stash pop                    # Restore stashed changes
git reset HEAD~1                 # Undo the last commit (keeps changes)

# --- REMOTE ---
git remote -v                    # Show connected remote URLs
git fetch                        # Download remote changes without merging
git push -u origin main          # First push (sets upstream)
```

---

## 14. Troubleshooting Common Issues

### "Authentication failed" when pushing

GitHub removed password authentication in 2021. Use a **Personal Access Token** as your password.
- Go to: [https://github.com/settings/tokens](https://github.com/settings/tokens)
- Generate a classic token with `repo` scope.
- Paste it when prompted for a password.

### "Repository not found"

- Double-check the remote URL: `git remote -v`
- Make sure you have access to the repository (it exists and you're logged in to the right account).
- Re-add the correct remote: `git remote set-url origin https://github.com/YOUR_USERNAME/devstudio.git`

### "Nothing to commit, working tree clean"

- All your changes are already saved. You're up to date.

### "Merge conflict"

Conflicts happen when two changes overlap. Git will mark the file like this:

```
<<<<<<< HEAD
Your local change
=======
Remote change
>>>>>>> origin/main
```

Edit the file to keep the version you want, remove the conflict markers, then:

```bash
git add .
git commit -m "Resolve merge conflict"
```

### "Permission denied (publickey)"

This means GitHub is expecting SSH authentication but you haven't set it up. Use HTTPS instead:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/devstudio.git
```

### Build fails on Vercel after push

1. Check that all environment variables are set in Vercel (Step 11).
2. Look at the build logs in Vercel → **Deployments** → click the failed deploy.
3. A missing `VITE_` variable is the most common cause — the build will succeed locally but fail on Vercel if a variable is missing.

### Accidentally committed .env or secrets

If you accidentally pushed your `.env` file:

1. Remove it from tracking:
   ```bash
   git rm --cached .env
   echo ".env" >> .gitignore
   git add .gitignore
   git commit -m "Remove .env from tracking"
   git push
   ```
2. **Immediately rotate all your API keys** (Firebase, Cloudinary, Gemini) because they may have been exposed.

---

## Summary

| Step | What You Did |
|---|---|
| Created a GitHub account | Signed up at github.com |
| Installed Git | Installed locally and configured name/email |
| Created a repository | Empty repo on GitHub for DevStudio |
| Connected your project | `git remote add origin <url>` |
| Pushed your code | `git add . → git commit → git push` |
| Protected secrets | `.env` in `.gitignore`, variables in Vercel |
| Set up auto-deploy | Vercel connected to GitHub repo |
| Set env variables | All `VITE_` and server vars added in Vercel |

Your DevStudio project is now version-controlled, backed up on GitHub, and automatically deployed to Vercel on every push to `main`.

---

*Last updated: May 2026 — DevStudio Project*

# Migration Phase 1: Discovery and Analysis Summary

## Backend Structure
- **Express Server Directory:** `server/`
- **Main Entry Point:** `server/index.ts`
- **Routes:** `server/routes.ts`
- **Cloudinary Config:** `server/cloudinary.ts`

## API Routes
- `POST /api/upload`: Handles image uploads using `multer` and `multer-storage-cloudinary`.

## Backend Dependencies
- `express`
- `cloudinary`
- `multer`
- `multer-storage-cloudinary`
- `express-session`
- `passport`
- `passport-local`

## Frontend API Calls
- `client/src/pages/admin/Projects.tsx`: Uses `/api/upload` for project image uploads.
- `client/src/lib/queryClient.ts`: Defines the base API fetcher (likely `/api`).

## Environment Variables
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `VITE_FIREBASE_*` (Already prefixed)
- `VITE_ADMIN_EMAILS` (Already prefixed)

# Phase 2: Environment Variables Setup

## Required Frontend Variables
To support direct Cloudinary uploads, we need:
- `VITE_CLOUDINARY_CLOUD_NAME` (Value: de2wrwg6e)
- `VITE_CLOUDINARY_UPLOAD_PRESET` (To be provided by user/set in dashboard)

## Conversion Plan
1. Convert `CLOUDINARY_CLOUD_NAME` to `VITE_CLOUDINARY_CLOUD_NAME`.
2. Keep Firebase variables as they are already VITE_ prefixed.

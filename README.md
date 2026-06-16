# Moodify

Moodify is a full-stack mood-based music app built with a React frontend and an Express/MongoDB backend. The app uses facial expression detection and user authentication to let users explore and play songs based on their mood.

**Live Demo:** [moodify-beige-kappa.vercel.app](https://moodify-beige-kappa.vercel.app)


## Project Structure

- `Frontend/`
  - React application built with Vite
  - Routes and pages for authentication and the home/music experience
  - Expression component for face-based mood detection
  - Song player and UI styling with SCSS
- `Backend/`
  - Express server powering authentication, song data, and file upload/storage
  - MongoDB models for users, songs, and token blacklisting
  - Middleware for auth and song request validation
  - Redis caching and image storage support

## Tech Stack

### Frontend

- React 19
- Vite for fast development and build tooling
- React Router DOM for client-side routing
- Axios for HTTP requests
- Sass for component styling
- `@mediapipe/tasks-vision` for face expression or vision-related features

### Backend

- Node.js with Express 5
- MongoDB via Mongoose for data storage
- JWT (`jsonwebtoken`) for authentication tokens
- `bcryptjs` for password hashing
- `cookie-parser` for cookie handling
- `cors` for cross-origin support
- `dotenv` for environment variables
- `ioredis` for caching support
- `multer` for file upload handling
- `@imagekit/nodejs` for image storage integration
- `node-id3` for reading/writing MP3 metadata

## How It Works

### Frontend Flow

1. User accesses the React app in the browser.
2. Authentication pages allow users to register or log in.
3. After login, users can navigate to the home page where mood detection and music playback are available.
4. The app likely uses the facial expression utility to detect mood and then fetch recommended songs.
5. `axios` sends requests to the backend API for login, registration, and song data.

### Backend Flow

1. `server.js` loads environment variables and starts the Express server.
2. API routes are defined in `src/routes/` for auth and song-related operations.
3. Middleware checks authentication tokens on protected endpoints.
4. MongoDB stores users, songs, and blacklisted tokens.
5. Redis caching may be used to speed repeated data requests.
6. Uploaded song or image assets are processed by `multer` and stored using the configured storage service.

## Getting Started

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Backend

```bash
cd Backend
npm install
npm run dev
```

## Notes

- Update backend `.env` values for MongoDB, Redis, JWT secret, and any storage service keys.
- The backend uses CommonJS while the frontend uses ES modules.
- Add tests and deployment configuration as needed.

# Simple Auth Frontend

A modern React TypeScript application with Tailwind CSS, connecting to the [Simple-Auth-Backend](https://github.com/ridwanFatur/Simple-Auth-Backend). This frontend provides a seamless user authentication experience with JWT tokens, Google OAuth, and two-factor authentication.

## Features

- 🔐 JWT token-based authentication
- 🔄 Token refresh handling
- 🌐 Google OAuth integration
- 📱 Two-factor authentication (2FA)
- 📧 Email verification flow
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, and desktop)
- ⚡ Built with Vite for fast development
- 📝 TypeScript for type safety

## Demo


Uploading Simple 2FA Authenticator Method.mp4…



Uploading Mobile Responsive.mp4…



## Prerequisites

- [Simple-Auth-Backend](https://github.com/ridwanFatur/Simple-Auth-Backend) set up and running

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ridwanFatur/Simple-Auth-Frontend.git
cd Simple-Auth-Frontend
```

2. Install dependencies:

```bash
npm install
# or with yarn
yarn
```

3. Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server:

```bash
npm run dev
# or with yarn
yarn dev
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | URL of the backend API | http://localhost:8000 |
| VITE_FRONTEND_URL | URL of the frontend application | http://localhost:5173 |
| VITE_GOOGLE_CLIENT_ID | Google OAuth Client ID | - |

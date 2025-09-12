# Mini AI App

This repository contains a simple full‑stack application built with **React**, **Node.js** and **MongoDB** that demonstrates how to capture app requirements from user input, extract structured data using the OpenAI API 

## Features


* **Requirement Capture** – After logging in, users can enter a free‑form description of the app they want to build. The back end calls the OpenAI chat completion API in **structured output mode** to return a JSON object with `appName`, `entities`, `roles` and `features`.
* **Mock UI Generation** – Once requirements are extracted, the user can generate a simple user interface. Tabs/menus are created for roles and features; forms are generated for each entity using a few generic fields. This satisfies the requirement to “generate a very simple mock UI” of the app.


## Getting Started

### Prerequisites

* Node.js v18 or later and npm
* MongoDB (local or MongoDB Atlas)

### Setup

1. **Clone the repo** and install dependencies for both the server and client:

   ```bash
   git clone <this-repo-url>
   cd mini-ai-app/server
   npm install
   cd ../client
   npm install
   ```

2. **Configure environment variables** by copying `.env.example` to `.env` in the `server` directory and setting values:

   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env to set your OpenAI API key and optionally MONGO_URI and PORT
   ```

3. **Start the back end**:

   ```bash
   cd server
   npm run dev
   ```

   The API will be running on `http://localhost:4000` by default.

4. **Start the front end**:

   ```bash
   cd client
   npm run dev
   ```

   The React app will run on `http://localhost:5173` and proxy API requests to the back end.

5. **Register a user and start capturing requirements**. After logging in you can submit app descriptions and generate a mock UI.

## Deployment

To deploy the application, host the Node.js API and MongoDB on a service like Render or Heroku, and the React app on Vercel or Netlify. Set the `VITE_API_BASE` environment variable in the client to point at your deployed API.


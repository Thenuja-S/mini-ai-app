# Mini AI App

This repository contains a simple full‑stack application built with **React**, **Node.js** and **MongoDB** that demonstrates how to capture app requirements from user input, extract structured data using the OpenAI (gpt-4o) API  

## Features


* **Requirement Capture** – Users can enter a requirement description of the app they want to build. The back end calls the OpenAI chat completion API in **structured output mode** to return a JSON object with `appName`, `entities`, `roles` , `features`, and `entitySchemas`.
* **Mock UI Generation** – Once requirements are extracted, the user can generate a simple user interface. Tabs/menus are created for roles and features; forms are generated for each entity using a few dynamic fields according to the entity. 


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

2. **Configure environment variables** by adding keys in `.env` in the `server` directory and setting values:

   ```bash
   cd ../server
   .env
   # Edit .env to set your OpenAI API key, MONGO_URI and optionally PORT
   ```

3. **Start the back end**  to launch the API on port 4000:

   ```bash
   cd server
   npm run dev
   ```

   The API will be running on `http://localhost:4000` by default.

4. **Start the front end** start on port 5173:

   ```bash
   cd client
   npm run dev
   ```

   The React app will run on `http://localhost:5173` and proxy API requests to the back end.

5. **Start capturing requirements**. Enter app descriptions and submit to generate a mock UI.


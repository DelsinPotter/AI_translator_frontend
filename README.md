# AI Translator Web App Documentation

## Overview
The AI Translator Web App is a speech-to-text and text-to-text translation tool that leverages Generative AI for accurate translations. It allows users to input text manually or via speech recognition and translates it into their desired language with optional audio playback.

## Features
- **Speech-to-Text Input**: Uses browser-based speech recognition.
- **Text Translation**: Supports multiple languages.
- **Audio Playback**: Plays the translated text as speech.
- **Mobile-Friendly UI**: Responsive design for easy usage.
- **Backend with FastAPI**: Hosted on Railway for handling translations.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vercel (Deployment)
- **Backend**: FastAPI, Railway (Hosting)
- **APIs Used**:
  - Google Generative AI for translation
  - Browser SpeechRecognition API

## Installation & Setup
### Frontend Setup
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

## Deployment
### Backend Deployment on Railway
1. Push the backend code to GitHub.
2. Create a new Railway project and link the GitHub repository.
3. Add required environment variables.
4. Deploy and obtain the **backend URL**.

### Frontend Deployment on Vercel
1. Push the frontend code to GitHub.
2. Create a new project on Vercel and link the GitHub repository.
3. Update the **API_URL** in the frontend code to match the backend’s Railway URL.
4. Deploy the frontend.

## Usage Guide
1. Open the web app.
2. Enter text manually or use speech recognition.
3. Select input and output languages.
4. Click "Translate" to get the translated text.
5. Click "Play Translation" to hear the translation.

## Contributors
- **Abdul Hadi** – Developer & Maintainer



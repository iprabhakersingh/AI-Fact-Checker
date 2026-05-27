# AI Fact Checker

AI-powered fact-checking web application that extracts claims from PDFs, verifies them against live web data, and flags misinformation as Verified, Inaccurate, or False.

---

## Deployed App Link

Frontend:  
https://ai-fact-checker-neon.vercel.app/

Backend API:  
https://ai-fact-checker-yr9y.onrender.com

---

## GitHub Repository

https://github.com/iprabhakersingh/AI-Fact-Checker

---

Note: This project uses Node.js/React stack, so dependencies are managed through package.json instead of requirements.txt.

# Features

- Upload PDF documents
- Extract factual claims automatically
- Verify claims using live web search
- Detect fake or outdated statistics
- Display:
  - Claim
  - Verification Status
  - Confidence Score
  - Correct Information
  - Source Link
- Responsive React frontend
- Full-stack deployed application

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- Multer
- PDF.js

## APIs
- Tavily Search API
- OpenRouter (DeepSeek AI)

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

AI-Fact-Checker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── server/
    ├── controllers/
    ├── routes/
    ├── services/
    ├── package.json
    └── server.js

---

# How It Works

1. User uploads a PDF
2. Backend extracts text from PDF
3. Claims are identified automatically
4. Tavily searches the live web for evidence
5. DeepSeek AI compares claims with evidence
6. Results are returned to frontend
7. UI displays verification report

---

# Installation

## Clone Repository

git clone https://github.com/iprabhakersingh/AI-Fact-Checker.git

---

# Frontend Setup

- cd client
- npm install
- npm run dev

---

# Backend Setup

- cd server
- npm install
- npm run dev

---

# Environment Variables

Create `.env` inside `server/`

- PORT=5000
- TAVILY_API_KEY=your_tavily_key
- OPENROUTER_API_KEY=your_openrouter_key

---

# Deployment Configuration

## Frontend (Vercel)

Root Directory: client  
Build Command: npm run build  
Output Directory: dist

## Backend (Render)

Root Directory: server  
Build Command: npm install  
Start Command: node server.js

---

# Evaluation Focus

This project was designed to handle:
- Fake statistics
- Outdated claims
- Hallucinated AI-generated facts
- Trap documents containing misinformation

The system cross-verifies claims using live web evidence and AI-assisted reasoning.

---

# Future Improvements

- Better semantic verification
- Multi-language support
- AI summarization
- Dashboard analytics
- Authentication system
- Advanced confidence scoring

---

# Author

Prabhaker Singh

GitHub:
https://github.com/iprabhakersingh

---

# License

This project was created for assessment and educational purposes.

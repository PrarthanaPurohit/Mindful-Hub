# Mindful-Hub

## Deploy URL
- Frontend: https://mindful-hub-frontend.vercel.app/login
- Backend: https://mindful-hub-backend.vercel.app/

## Demo URL 
https://github.com/user-attachments/assets/4fddedf8-0c88-482d-a52f-48e2429a499a

## Overview
Mindful-Hub is a mental health support platform built with a React frontend and an Express/MongoDB backend. It helps users track mood, write journals, connect with counselors, submit feedback, and access AI-powered suggestions.

## Project Structure
- `backend/` — API server, MongoDB models, authentication, routes, and seed data
- `frontend/` — React application, pages, auth flow, and client-side routing

## Features
- User signup and login with JWT authentication
- Personal journal creation and management
- Mood tracking with daily entries
- AI-generated suggestions for mood improvement
- Counselor directory and appointment booking
- User testimonial and feedback submission
- Responsive UI for desktop and mobile

## Tech Stack
- Frontend: React, React Router, Axios, CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Deployment: Vercel

## Local Setup
### 1. Backend
```powershell
cd backend
npm install
```
Copy the example `.env` and update the values:
```powershell
Copy-Item backend\.env.example backend\.env
```
Edit `backend\.env` and set:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY` (optional)

Start the backend server:
```powershell
npm run dev
```

### 2. Frontend
```powershell
cd ../frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser to view the app.

## Deployment
### Backend on Vercel
1. Push `backend/` to GitHub.
2. Connect the repo to Vercel.
3. Add environment variables in Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
4. Deploy the backend.

### Frontend on Vercel
1. Set `REACT_APP_API_URL` in `frontend/.env` to your backend URL.
2. Push `frontend/` to GitHub.
3. Connect the repo to Vercel and deploy.

> Note: Deploy the backend first so the frontend can use the correct API URL.

## Environment Variables
### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindful-hub
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=sk-your-openai-key
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=https://mindful-hub-backend.vercel.app
```

## Seed Sample Data
Run the counselor seed script once after the backend is running:
```powershell
cd backend
node seedCounselors.js
```

## Notes
- Do not commit `.env` files with secrets.
- Use a secure JWT secret in production.
- If you want OpenAI features, add an `OPENAI_API_KEY`.

## Contact
For issues or contributions, open an issue in the repository or submit a pull request.


## Useful scripts

- Backend
  - `npm run dev` — start backend with `nodemon`
  - `npm start` — start backend with `node server.js`

- Frontend
  - `npm start` — start React dev server


##  Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
App opens at `http://localhost:3000`

### Option 2: Using Concurrently (Optional)

Install concurrently in the root directory:
```bash
npm install -g concurrently
```

Add to root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

Run both:
```bash
npm run dev
```

=======
##  Project Structure

```
mental-wellness-journal/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Journal.js
│   │   ├── Mood.js
│   │   ├── Testimonial.js
│   │   ├── Counselor.js
│   │   ├── Appointment.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── journals.js
│   │   ├── moods.js
│   │   ├── suggestions.js
│   │   ├── testimonials.js
│   │   ├── counselors.js
│   │   ├── appointments.js
│   │   └── feedback.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   ├── seedCounselors.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Journal.js
│   │   │   ├── MoodTracker.js
│   │   │   ├── Testimonials.js
│   │   │   ├── Counselors.js
│   │   │   └── Feedback.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── README.md
└── .gitignore
```

##  API Endpoints

### Authentication
```
POST   /api/auth/signup        - Create new user account
POST   /api/auth/login         - Login user
```

### Journals
```
GET    /api/journals           - Get all user journals
POST   /api/journals           - Create new journal entry
GET    /api/journals/:id       - Get single journal
PUT    /api/journals/:id       - Update journal
DELETE /api/journals/:id       - Delete journal
```

### Moods
```
GET    /api/moods              - Get all user mood entries
POST   /api/moods              - Create new mood entry
GET    /api/moods/:id          - Get single mood entry
```

### Suggestions
```
POST   /api/suggestions        - Get AI-powered suggestions
```

### Testimonials
```
GET    /api/testimonials       - Get all approved testimonials
POST   /api/testimonials       - Create new testimonial
GET    /api/testimonials/my-testimonials - Get user's testimonials
```

### Counselors
```
GET    /api/counselors         - Get all counselors
GET    /api/counselors/:id     - Get single counselor
POST   /api/counselors         - Create counselor (admin)
```

### Appointments
```
GET    /api/appointments       - Get user's appointments
POST   /api/appointments       - Create new appointment
GET    /api/appointments/:id   - Get single appointment
PATCH  /api/appointments/:id/cancel - Cancel appointment
```

### Feedback
```
POST   /api/feedback           - Submit feedback
GET    /api/feedback/my-feedback - Get user's feedback
```


##  Testing

### Test User Flow

1. **Sign Up**: Create a new account
2. **Dashboard**: Explore available features
3. **Journal**: Write and save journal entries
4. **Mood Tracker**: 
   - Rate your day
   - Select emotion
   - Get AI suggestions
   - Save mood entry
5. **Testimonials**: Share your experience
6. **Counselors**: Browse and book appointments
7. **Feedback**: Submit feedback about the app


## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Solution: Ensure MongoDB is running locally or check Atlas connection string
```

**2. CORS Error**
```
Solution: Backend already has CORS enabled. Check if backend is running on port 5000
```

**3. OpenAI API Error**
```
Solution: Verify API key is correct and has available credits
```

**4. Port Already in Use**
```
Solution: Kill process on port 5000 or 3000
# On Mac/Linux
lsof -ti:5000 | xargs kill -9
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```


##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

** If you find this project helpful, please consider giving it a star!**

Made with ❤️ for mental wellness
>>>>>>> 

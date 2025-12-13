# 🌟 Mental Wellness Journal - MERN Stack Application

A comprehensive mental wellness and journaling application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application helps users track their mental health, write journals, connect with counselors, and receive AI-powered mood improvement suggestions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📝 **Journal Writing** - Create and manage personal journal entries
- 😊 **Mood Tracking** - Daily mood rating with emoji-based interface
- 🤖 **AI-Powered Suggestions** - Get personalized mood improvement tips from OpenAI GPT
- ⭐ **User Testimonials** - Share and read community success stories
- 👨‍⚕️ **Counselor Directory** - Browse professional counselors and book appointments
- 📅 **Appointment Booking** - Schedule sessions with mental health professionals
- 💬 **Feedback System** - Submit bug reports, feature requests, and general feedback

### UI/UX Features
- 🎨 Beautiful gradient-based design with glassmorphism effects
- 📱 Fully responsive layout (mobile, tablet, desktop)
- 🌈 Interactive elements with smooth animations
- ⭐ Star rating system for testimonials and feedback
- 🎯 Intuitive navigation with React Router

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **OpenAI API** - AI-powered suggestions

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **OpenAI API Key** (for AI suggestions feature)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mental-wellness-journal.git
cd mental-wellness-journal
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### 1. Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/journal-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Getting your keys:**

- **MongoDB URI**: 
  - Local: `mongodb://localhost:27017/journal-app`
  - Cloud (Atlas): `mongodb+srv://username:password@cluster.mongodb.net/journal-app`
  
- **JWT Secret**: Generate a random string (e.g., use `openssl rand -base64 32`)

- **OpenAI API Key**: Get it from [platform.openai.com](https://platform.openai.com)

### 2. Seed Sample Data

Populate the database with sample counselors:

```bash
cd backend
node seedCounselors.js
```

Expected output:
```
✅ MongoDB Connected
🗑️  Cleared existing counselors
✅ Sample counselors added successfully!
```

## 🏃‍♂️ Running the Application

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

## 📁 Project Structure

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

## 🔌 API Endpoints

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


## 🧪 Testing

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

### Sample Test Credentials

After seeding, you can create your own account or use:
```
Email: test@example.com
Password: test123
```

## 🐛 Troubleshooting

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

## 🔐 Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- Environment variables store sensitive data
- Input validation on all forms
- Protected API routes with auth middleware


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

## 📝 Future Enhancements

- [ ] Email notifications for appointments
- [ ] Admin dashboard for managing content
- [ ] Data visualization (mood trends, journal statistics)
- [ ] Export journals as PDF
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Video call integration for counseling
- [ ] Payment gateway for paid sessions
- [ ] Social features (share anonymously)




## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT API
- [Lucide Icons](https://lucide.dev) for beautiful icons
- Mental health professionals who inspired this project
- Open source community for amazing tools

---

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ for mental wellness

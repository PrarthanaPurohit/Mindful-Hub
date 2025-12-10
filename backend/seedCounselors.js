const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Counselor = require('./models/Counselor');

dotenv.config();

const counselors = [
  {
    name: "Dr. Sarah Mitchell",
    specialization: "Anxiety & Depression",
    qualification: "PhD in Clinical Psychology",
    experience: "12 years",
    email: "sarah.mitchell@therapy.com",
    phone: "+1 (555) 123-4567",
    availableDays: ["Monday", "Wednesday", "Friday"],
    rating: 4.9,
    bio: "Specialized in cognitive behavioral therapy with a focus on anxiety disorders and depression. Passionate about helping clients develop coping strategies."
  },
  {
    name: "Dr. James Rodriguez",
    specialization: "Relationship Counseling",
    qualification: "Licensed Marriage and Family Therapist",
    experience: "15 years",
    email: "james.rodriguez@therapy.com",
    phone: "+1 (555) 234-5678",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    rating: 4.8,
    bio: "Expert in couples therapy and family dynamics. Helps clients build stronger, healthier relationships through evidence-based practices."
  },
  {
    name: "Dr. Emily Chen",
    specialization: "Stress Management",
    qualification: "PsyD, Certified Mindfulness Instructor",
    experience: "8 years",
    email: "emily.chen@therapy.com",
    phone: "+1 (555) 345-6789",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    rating: 4.7,
    bio: "Integrates mindfulness-based stress reduction with traditional therapy. Specializes in helping professionals manage work-life balance."
  },
  {
    name: "Dr. Michael Thompson",
    specialization: "Trauma & PTSD",
    qualification: "MD, Psychiatrist",
    experience: "20 years",
    email: "michael.thompson@therapy.com",
    phone: "+1 (555) 456-7890",
    availableDays: ["Wednesday", "Friday", "Saturday"],
    rating: 4.9,
    bio: "Board-certified psychiatrist specializing in trauma recovery and PTSD treatment using EMDR and other evidence-based therapies."
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Teen & Young Adult Therapy",
    qualification: "MA in Counseling Psychology",
    experience: "10 years",
    email: "priya.sharma@therapy.com",
    phone: "+1 (555) 567-8901",
    availableDays: ["Monday", "Wednesday", "Saturday"],
    rating: 4.8,
    bio: "Dedicated to supporting teenagers and young adults through life transitions, identity issues, and mental health challenges."
  },
  {
    name: "Dr. Robert Williams",
    specialization: "Addiction Counseling",
    qualification: "LCSW, Certified Addiction Counselor",
    experience: "18 years",
    email: "robert.williams@therapy.com",
    phone: "+1 (555) 678-9012",
    availableDays: ["Tuesday", "Thursday", "Friday"],
    rating: 4.7,
    bio: "Compassionate addiction specialist helping individuals overcome substance abuse and behavioral addictions with holistic approaches."
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Clear existing counselors
    await Counselor.deleteMany({});
    console.log('🗑️  Cleared existing counselors');
    
    // Insert new counselors
    await Counselor.insertMany(counselors);
    console.log('✅ Sample counselors added successfully!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
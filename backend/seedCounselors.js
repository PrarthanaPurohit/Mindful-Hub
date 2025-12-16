const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Counselor = require('./models/Counselor');

dotenv.config();

const counselors = [
  {
    name: "Dr. Priya Sharma",
    specialization: "Anxiety & Depression",
    qualification: "PhD in Clinical Psychology",
    experience: "12 years",
    email: "priya.sharma@therapy.com",
    phone: "+919845123456",
    availableDays: ["Monday", "Wednesday", "Friday"],
    rating: 4.9,
    bio: "Specialized in cognitive behavioral therapy with a focus on anxiety disorders and depression. Passionate about helping clients develop coping strategies."
  },
  {
    name: "Dr. Rajesh Kumar",
    specialization: "Relationship Counseling",
    qualification: "Licensed Marriage and Family Therapist",
    experience: "15 years",
    email: "rajesh.kumar@therapy.com",
    phone: "+919845234567",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    rating: 4.8,
    bio: "Expert in couples therapy and family dynamics. Helps clients build stronger, healthier relationships through evidence-based practices."
  },
  {
    name: "Dr. Anjali Desai",
    specialization: "Stress Management",
    qualification: "PsyD, Certified Mindfulness Instructor",
    experience: "8 years",
    email: "anjali.desai@therapy.com",
    phone: "+919845345678",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    rating: 4.7,
    bio: "Integrates mindfulness-based stress reduction with traditional therapy. Specializes in helping professionals manage work-life balance."
  },
  {
    name: "Dr. Vikram Patel",
    specialization: "Trauma & PTSD",
    qualification: "MD, Psychiatrist",
    experience: "20 years",
    email: "vikram.patel@therapy.com",
    phone: "+919845456789",
    availableDays: ["Wednesday", "Friday", "Saturday"],
    rating: 4.9,
    bio: "Board-certified psychiatrist specializing in trauma recovery and PTSD treatment using EMDR and other evidence-based therapies."
  },
  {
    name: "Dr. Meera Reddy",
    specialization: "Teen & Young Adult Therapy",
    qualification: "MA in Counseling Psychology",
    experience: "10 years",
    email: "meera.reddy@therapy.com",
    phone: "+919845567890",
    availableDays: ["Monday", "Wednesday", "Saturday"],
    rating: 4.8,
    bio: "Dedicated to supporting teenagers and young adults through life transitions, identity issues, and mental health challenges."
  },
  {
    name: "Dr. Arjun Mehta",
    specialization: "Addiction Counseling",
    qualification: "LCSW, Certified Addiction Counselor",
    experience: "18 years",
    email: "arjun.mehta@therapy.com",
    phone: "+919845678901",
    availableDays: ["Tuesday", "Thursday", "Friday"],
    rating: 4.7,
    bio: "Compassionate addiction specialist helping individuals overcome substance abuse and behavioral addictions with holistic approaches."
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected\n');
    
    // Delete all existing counselors
    const deleteResult = await Counselor.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing counselors\n`);
    
    // Insert new counselors
    await Counselor.insertMany(counselors);
    console.log('✅ Successfully added counselors!\n');
    
    console.log('Counselors:');
    counselors.forEach(c => {
      console.log(`  - ${c.name} (${c.phone})`);
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
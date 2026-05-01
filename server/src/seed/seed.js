import mongoose from "mongoose";
import dotenv from "dotenv";
import { Doctor } from "../models/doctor.model.js";
dotenv.config();
const doctors_images = [
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763740344/uploads/hqlms5jg3zyve8gnlutn.png',
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763740094/uploads/howpq6gmgbduyqepyf8x.png',
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763739964/uploads/e7djz0k3vtj0db9ppvpx.png',
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763650050/uploads/rrzzxorweqlohqs14jt2.png',
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763650647/uploads/obe6f7ynkb4g4cd27non.png',
  'https://res.cloudinary.com/djovbiyia/image/upload/v1763649939/uploads/gatzwllgpmmxs1t6kppy.png'
];
const doctorsData = [
  {
    name: "Dr. John Smith",
    email: "john.smith@test.com",
    password: "123456",
    speciality: "General Physician",
    degree: "MBBS",
    address: "Nablus, Palestine",
    profilePicture: doctors_images[0],
    experience: "5 Years",
    fees: 20,
    about: "Experienced general physician providing primary healthcare services."
  },
  {
    name: "Dr. Emily Johnson",
    email: "emily.johnson@test.com",
    password: "123456",
    speciality: "Cardiologist",
    degree: "MD Cardiology",
    address: "Ramallah, Palestine",
    profilePicture: doctors_images[1],
    experience: "8 Years",
    fees: 40,
    about: "Heart specialist with strong experience in cardiac diseases."
  },
  {
    name: "Dr. Michael Brown",
    email: "michael.brown@test.com",
    password: "123456",
    speciality: "Neurologist",
    degree: "MD Neurology",
    address: "Jerusalem, Palestine",
    profilePicture: doctors_images[2],
    experience: "6 Years",
    fees: 35,
    about: "Specialist in brain and nervous system disorders."
  },
  {
    name: "Dr. Sophia Davis",
    email: "sophia.davis@test.com",
    password: "123456",
    speciality: "Pediatrician",
    degree: "MBBS Pediatrics",
    address: "Hebron, Palestine",
    profilePicture: doctors_images[3],
    experience: "4 Years",
    fees: 25,
    about: "Child healthcare specialist with a friendly approach."
  },
  {
    name: "Dr. Daniel Wilson",
    email: "daniel.wilson@test.com",
    password: "123456",
    speciality: "Orthopedic Surgeon",
    degree: "MS Orthopedics",
    address: "Jenin, Palestine",
    profilePicture: doctors_images[4],
    experience: "7 Years",
    fees: 45,
    about: "Expert in bone and joint surgeries."
  },
  {
    name: "Dr. Olivia Martinez",
    email: "olivia.martinez@test.com",
    password: "123456",
    speciality: "Dermatologist",
    degree: "MD Dermatology",
    address: "Bethlehem, Palestine",
    profilePicture: doctors_images[5],
    experience: "3 Years",
    fees: 30,
    about: "Skin specialist focused on cosmetic and medical dermatology."
  }
];
const seedDoctors = async () => {
    try {
    console.log("✅ MongoDB Connected");
    await Doctor.deleteMany();
    console.log("🗑️ Old doctors removed");
    await Doctor.insertMany(doctorsData);
    console.log("✅ Doctors inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    process.exit(1);
  }
};
seedDoctors();
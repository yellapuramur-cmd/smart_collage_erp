import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from './models/User.js';
import Department from './models/Department.js';
import Course from './models/Course.js';
import Subject from './models/Subject.js';
import Faculty from './models/Faculty.js';
import Student from './models/Student.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      family: 4,
      tls: true,
      tlsInsecure: true
    });
    console.log('✅ MongoDB Connected for Seeding');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    
    console.log('🧹 Clearing old database records...');
    await User.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Subject.deleteMany();
    await Faculty.deleteMany();
    await Student.deleteMany();

    console.log('👑 Creating Admin user...');
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@erp.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('🏛️ Creating Indian Academic Departments...');
    const cseDept = await Department.create({
      name: 'Computer Science and Engineering',
      code: 'CSE',
      description: 'Department of Computer Science, Software Engineering & AI'
    });
    const itDept = await Department.create({
      name: 'Information Technology',
      code: 'IT',
      description: 'Department of Information Technology & Web Systems'
    });
    const eceDept = await Department.create({
      name: 'Electronics and Communication Engineering',
      code: 'ECE',
      description: 'Department of Microelectronics, VLSI & Signal Processing'
    });
    const eeeDept = await Department.create({
      name: 'Electrical and Electronics Engineering',
      code: 'EEE',
      description: 'Department of Power Systems & Control Engineering'
    });

    console.log('🎓 Creating Degree Courses...');
    const btechCse = await Course.create({
      name: 'B.Tech Computer Science & Engineering',
      code: 'BTECH-CSE',
      department: cseDept._id,
      duration: 4,
      totalSemesters: 8,
      description: '4-Year Undergraduate Degree in Computer Science'
    });
    
    const btechIt = await Course.create({
      name: 'B.Tech Information Technology',
      code: 'BTECH-IT',
      department: itDept._id,
      duration: 4,
      totalSemesters: 8,
      description: '4-Year Undergraduate Degree in IT'
    });

    const btechEce = await Course.create({
      name: 'B.Tech Electronics & Communication',
      code: 'BTECH-ECE',
      department: eceDept._id,
      duration: 4,
      totalSemesters: 8,
      description: '4-Year Undergraduate Degree in ECE'
    });

    console.log('📚 Creating Academic Subjects...');
    const sub1 = await Subject.create({ name: 'Data Structures & Algorithms', code: 'CS201', course: btechCse._id, department: cseDept._id, semester: 3, credits: 4, type: 'theory' });
    const sub2 = await Subject.create({ name: 'Database Management Systems', code: 'CS202', course: btechCse._id, department: cseDept._id, semester: 3, credits: 4, type: 'theory' });
    const sub3 = await Subject.create({ name: 'Operating Systems', code: 'CS301', course: btechCse._id, department: cseDept._id, semester: 4, credits: 4, type: 'theory' });
    const sub4 = await Subject.create({ name: 'Computer Networks', code: 'CS302', course: btechCse._id, department: cseDept._id, semester: 4, credits: 4, type: 'theory' });
    const sub5 = await Subject.create({ name: 'Object Oriented Programming', code: 'IT201', course: btechIt._id, department: itDept._id, semester: 3, credits: 4, type: 'theory' });
    const sub6 = await Subject.create({ name: 'Web Development Technologies', code: 'IT301', course: btechIt._id, department: itDept._id, semester: 4, credits: 4, type: 'practical' });
    const sub7 = await Subject.create({ name: 'Signals & Systems', code: 'EC201', course: btechEce._id, department: eceDept._id, semester: 3, credits: 4, type: 'theory' });
    const sub8 = await Subject.create({ name: 'Digital Logic & Circuit Design', code: 'EC202', course: btechEce._id, department: eceDept._id, semester: 3, credits: 4, type: 'theory' });

    console.log('👨‍🏫 Creating Indian Faculty Members & User Accounts...');
    const facultySeed = [
      { name: 'Dr. Ramesh Chander', email: 'ramesh@erp.com', empId: 'FAC-CSE-101', dept: cseDept._id, desig: 'Head of Department', qual: 'Ph.D. Computer Science (IIT Bombay)', spec: 'Artificial Intelligence, Algorithms', exp: 16, phone: '9876543210', subs: [sub1._id, sub2._id] },
      { name: 'Dr. Sunita Kulkarni', email: 'sunita@erp.com', empId: 'FAC-ECE-102', dept: eceDept._id, desig: 'Professor', qual: 'Ph.D. Microelectronics (IISc Bangalore)', spec: 'VLSI Design, Signal Processing', exp: 14, phone: '9876543211', subs: [sub7._id, sub8._id] },
      { name: 'Prof. Rajesh Kumar', email: 'rajesh@erp.com', empId: 'FAC-IT-103', dept: itDept._id, desig: 'Associate Professor', qual: 'M.Tech IT (BITS Pilani)', spec: 'Full Stack Development, Cloud Computing', exp: 9, phone: '9876543212', subs: [sub5._id, sub6._id] },
      { name: 'Dr. Meenakshi Sundaram', email: 'meenakshi@erp.com', empId: 'FAC-CSE-104', dept: cseDept._id, desig: 'Assistant Professor', qual: 'Ph.D. Software Engineering (NIT Trichy)', spec: 'Cybersecurity, Operating Systems', exp: 6, phone: '9876543213', subs: [sub3._id, sub4._id] },
    ];

    for (const f of facultySeed) {
      const fUser = await User.create({
        name: f.name,
        email: f.email,
        password: 'password123',
        role: 'faculty'
      });

      await Faculty.create({
        user: fUser._id,
        employeeId: f.empId,
        name: f.name,
        email: f.email,
        department: f.dept,
        designation: f.desig,
        qualification: f.qual,
        specialization: f.spec,
        phone: f.phone,
        experience: f.exp,
        subjects: f.subs
      });
    }

    console.log('🎓 Creating Indian Student Members & User Accounts...');
    const studentSeed = [
      { name: 'Aarav Sharma', email: 'aarav@erp.com', enr: '2023CSE001', dept: cseDept._id, course: btechCse._id, sem: 3, year: 2, gender: 'Male', phone: '9123456780', guardian: 'Suresh Sharma' },
      { name: 'Ananya Iyer', email: 'ananya@erp.com', enr: '2023CSE002', dept: cseDept._id, course: btechCse._id, sem: 3, year: 2, gender: 'Female', phone: '9123456781', guardian: 'Venkatesh Iyer' },
      { name: 'Rohan Gupta', email: 'rohan@erp.com', enr: '2023CSE003', dept: cseDept._id, course: btechCse._id, sem: 3, year: 2, gender: 'Male', phone: '9123456782', guardian: 'Anil Gupta' },
      { name: 'Priya Nair', email: 'priya@erp.com', enr: '2023IT001', dept: itDept._id, course: btechIt._id, sem: 3, year: 2, gender: 'Female', phone: '9123456783', guardian: 'Kiran Nair' },
      { name: 'Vikram Malhotra', email: 'vikram@erp.com', enr: '2023IT002', dept: itDept._id, course: btechIt._id, sem: 3, year: 2, gender: 'Male', phone: '9123456784', guardian: 'Vijay Malhotra' },
      { name: 'Ishita Patel', email: 'ishita@erp.com', enr: '2023ECE001', dept: eceDept._id, course: btechEce._id, sem: 3, year: 2, gender: 'Female', phone: '9123456785', guardian: 'Bhavesh Patel' },
      { name: 'Aditya Verma', email: 'aditya@erp.com', enr: '2023ECE002', dept: eceDept._id, course: btechEce._id, sem: 3, year: 2, gender: 'Male', phone: '9123456786', guardian: 'Mahesh Verma' },
      { name: 'Diya Kapoor', email: 'diya@erp.com', enr: '2023CSE004', dept: cseDept._id, course: btechCse._id, sem: 3, year: 2, gender: 'Female', phone: '9123456787', guardian: 'Rajiv Kapoor' },
    ];

    for (const s of studentSeed) {
      const sUser = await User.create({
        name: s.name,
        email: s.email,
        password: 'password123',
        role: 'student'
      });

      await Student.create({
        user: sUser._id,
        enrollmentNo: s.enr,
        name: s.name,
        email: s.email,
        department: s.dept,
        course: s.course,
        semester: s.sem,
        year: s.year,
        dateOfBirth: new Date('2003-05-15'),
        gender: s.gender,
        phone: s.phone,
        address: 'MG Road, Sector 14, New Delhi',
        guardianName: s.guardian,
        guardianPhone: '9876500000'
      });
    }

    console.log('✨ Database Seeded Successfully with Realistic Indian Data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

importData();

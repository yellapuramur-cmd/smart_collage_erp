import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrollmentNo: {
    type: String,
    required: [true, 'Enrollment Number is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  semester: {
    type: Number,
    default: 1
  },
  year: {
    type: Number,
    default: 1
  },
  dateOfBirth: {
    type: Date,
    default: () => new Date('2003-01-01')
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  phone: {
    type: String,
    default: 'N/A'
  },
  address: {
    type: String,
    default: 'N/A'
  },
  guardianName: {
    type: String,
    default: 'N/A'
  },
  guardianPhone: {
    type: String,
    default: 'N/A'
  },
  bloodGroup: {
    type: String,
    default: 'O+'
  }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);

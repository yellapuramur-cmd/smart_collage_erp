import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
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
  designation: {
    type: String,
    default: 'Assistant Professor'
  },
  qualification: {
    type: String,
    default: 'M.Tech / Ph.D.'
  },
  specialization: {
    type: String,
    default: 'General'
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  phone: {
    type: String,
    default: 'N/A'
  },
  experience: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

export default mongoose.model('Faculty', facultySchema);

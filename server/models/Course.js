import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  duration: {
    type: Number, // In years
    required: true
  },
  totalSemesters: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);

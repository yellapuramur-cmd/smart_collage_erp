import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  examType: {
    type: String,
    enum: ['internal', 'midterm', 'final', 'quiz', 'assignment'],
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  remarks: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Marks', marksSchema);

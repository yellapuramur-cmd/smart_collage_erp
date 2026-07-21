import ChatHistory from '../models/ChatHistory.js';
import { generateResponse, analyzeIntent } from '../services/geminiService.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Timetable from '../models/Timetable.js';
import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';
import { ApiResponse } from '../utils/helpers.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    
    // Analyze Intent
    const intent = await analyzeIntent(message);
    
    // Gather Context based on intent
    let contextData = {};
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user.id });
      if (student) {
        if (intent === 'attendance') {
          contextData.attendance = await Attendance.find({ student: student._id }).populate('subject');
        } else if (intent === 'marks') {
          contextData.marks = await Marks.find({ student: student._id }).populate('subject');
        } else if (intent === 'timetable') {
          contextData.timetable = await Timetable.find({ course: student.course, semester: student.semester }).populate('subject');
        } else {
          contextData.profile = student;
        }
      }
    } else if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user.id });
      if (faculty) {
        contextData.profile = faculty;
      }
    }
    
    // Get Gemini Response
    const aiResponse = await generateResponse(message, contextData);
    
    // Save to chat history
    let chat = await ChatHistory.findOne({ user: req.user.id });
    if (!chat) {
      chat = await ChatHistory.create({
        user: req.user.id,
        messages: []
      });
    }
    
    chat.messages.push({ role: 'user', content: message });
    chat.messages.push({ role: 'assistant', content: aiResponse });
    await chat.save();
    
    ApiResponse.success(res, 200, 'Response generated', { reply: aiResponse });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const chat = await ChatHistory.findOne({ user: req.user.id });
    ApiResponse.success(res, 200, 'Chat history fetched', chat ? chat.messages : []);
  } catch (error) {
    next(error);
  }
};

export const clearChatHistory = async (req, res, next) => {
  try {
    await ChatHistory.findOneAndDelete({ user: req.user.id });
    ApiResponse.success(res, 200, 'Chat history cleared');
  } catch (error) {
    next(error);
  }
};

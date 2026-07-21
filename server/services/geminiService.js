import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initialize Gemini with API Key
 */
const initGemini = () => {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

/**
 * Generate a response from Gemini using user message and ERP context
 * @param {String} userMessage 
 * @param {Object} context 
 * @returns {Promise<String>}
 */
export const generateResponse = async (userMessage, context) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      You are an AI assistant for a College ERP system. 
      Context Data from ERP: ${JSON.stringify(context)}
      User Message: ${userMessage}
      
      Respond helpfully and concisely using the provided context if applicable.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'I am currently unable to process this request. Please try again later.';
  }
};

/**
 * Analyze the intent of a user message to determine what ERP data is needed
 * @param {String} message 
 * @returns {Promise<String>}
 */
export const analyzeIntent = async (message) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Analyze the following message from a college student/faculty and categorize its intent into one of the following exact strings:
      'attendance', 'marks', 'timetable', 'assignments', 'fees', 'general'.
      Message: "${message}"
      Output ONLY the category string.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toLowerCase();
    
    const validIntents = ['attendance', 'marks', 'timetable', 'assignments', 'fees', 'general'];
    if (validIntents.includes(text)) {
      return text;
    }
    return 'general';
  } catch (error) {
    console.error('Gemini Intent Error:', error);
    return 'general';
  }
};

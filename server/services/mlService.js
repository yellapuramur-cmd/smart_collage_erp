/**
 * ML Service for external Python microservice communication
 * Uses fetch API to call the Python service
 */

/**
 * Predict student performance
 * @param {Object} studentData 
 * @returns {Promise<Object>}
 */
export const predictPerformance = async (studentData) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${mlUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });
    
    if (!response.ok) {
      throw new Error('ML Service Error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('predictPerformance Error:', error.message);
    return { error: 'Failed to predict performance' };
  }
};

/**
 * Get attendance risk
 * @param {Object} attendanceData 
 * @returns {Promise<Object>}
 */
export const getAttendanceRisk = async (attendanceData) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${mlUrl}/attendance-risk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attendanceData)
    });
    
    if (!response.ok) {
      throw new Error('ML Service Error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('getAttendanceRisk Error:', error.message);
    return { error: 'Failed to get attendance risk' };
  }
};

/**
 * Generate smart timetable
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
export const generateSmartTimetable = async (data) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${mlUrl}/generate-timetable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('ML Service Error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('generateSmartTimetable Error:', error.message);
    return { error: 'Failed to generate timetable' };
  }
};

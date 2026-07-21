from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from models.performance_predictor import PerformancePredictor
from models.attendance_risk import calculate_attendance_risk
from models.timetable_generator import generate_timetable_schedule

app = FastAPI(title="College ERP ML Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = PerformancePredictor()

class PerformanceInput(BaseModel):
    attendance: float
    internal_marks: float
    assignment_scores: float
    quiz_scores: float
    previous_gpa: float

class AttendanceInput(BaseModel):
    total_classes: int
    attended_classes: int

class TimetableInput(BaseModel):
    courses: List[str]
    rooms: List[str]
    days: int = 5
    slots_per_day: int = 4

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/predict")
def predict_performance(data: PerformanceInput):
    try:
        prediction = predictor.predict(
            data.attendance,
            data.internal_marks,
            data.assignment_scores,
            data.quiz_scores,
            data.previous_gpa
        )
        return {
            "success": True,
            "message": "Prediction successful",
            "data": prediction
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/attendance-risk")
def get_attendance_risk(data: AttendanceInput):
    try:
        risk_data = calculate_attendance_risk(data.total_classes, data.attended_classes)
        return {
            "success": True,
            "message": "Risk calculated successfully",
            "data": risk_data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate-timetable")
def generate_timetable(data: TimetableInput):
    try:
        schedule = generate_timetable_schedule(data.courses, data.rooms, data.days, data.slots_per_day)
        return {
            "success": True,
            "message": "Timetable generated successfully",
            "data": schedule
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

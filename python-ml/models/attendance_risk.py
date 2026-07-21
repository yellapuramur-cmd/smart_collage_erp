def calculate_attendance_risk(total_classes: int, attended_classes: int):
    if total_classes <= 0:
        raise ValueError("Total classes must be greater than 0")
    if attended_classes < 0 or attended_classes > total_classes:
        raise ValueError("Invalid attended classes count")

    percentage = (attended_classes / total_classes) * 100
    
    if percentage >= 85:
        risk_level = "Low"
        warning = "Good standing."
    elif percentage >= 75:
        risk_level = "Medium"
        warning = "Approaching minimum attendance threshold."
    else:
        risk_level = "High"
        warning = "Critical! Attendance below 75% threshold."

    return {
        "percentage": round(percentage, 2),
        "risk_level": risk_level,
        "warning_message": warning
    }

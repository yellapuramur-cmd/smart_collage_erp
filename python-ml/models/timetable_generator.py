import random

def generate_timetable_schedule(courses, rooms, days=5, slots_per_day=4):
    if not courses or not rooms:
        raise ValueError("Courses and rooms must be provided")

    schedule = []
    
    for day in range(1, days + 1):
        day_schedule = []
        for slot in range(1, slots_per_day + 1):
            random.shuffle(courses)
            random.shuffle(rooms)
            
            # Simple greedy assignment
            assigned_courses = []
            for i, room in enumerate(rooms):
                if i < len(courses):
                    assigned_courses.append({
                        "course": courses[i],
                        "room": room
                    })
            
            day_schedule.append({
                "slot": slot,
                "assignments": assigned_courses
            })
            
        schedule.append({
            "day": day,
            "slots": day_schedule
        })
        
    return schedule

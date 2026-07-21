import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def create_synthetic_data(n_samples=1000):
    np.random.seed(42)
    attendance = np.random.normal(75, 15, n_samples).clip(0, 100)
    internal = np.random.normal(70, 15, n_samples).clip(0, 100)
    assignments = np.random.normal(80, 10, n_samples).clip(0, 100)
    quizzes = np.random.normal(65, 20, n_samples).clip(0, 100)
    prev_gpa = np.random.normal(7.5, 1.5, n_samples).clip(0, 10)
    
    # 0: At Risk, 1: Average, 2: High Performer
    y = []
    for i in range(n_samples):
        score = attendance[i]*0.3 + internal[i]*0.2 + assignments[i]*0.15 + quizzes[i]*0.15 + (prev_gpa[i]*10)*0.2
        if score > 80:
            y.append(2)
        elif score > 60:
            y.append(1)
        else:
            y.append(0)
            
    X = np.column_stack((attendance, internal, assignments, quizzes, prev_gpa * 10))
    return X, np.array(y)

def train_model():
    print("Generating synthetic data...")
    X, y = create_synthetic_data(2000)
    
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X, y)
    
    model_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(model_dir, exist_ok=True)
    
    model_path = os.path.join(model_dir, 'model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved successfully to {model_path}")

if __name__ == "__main__":
    train_model()

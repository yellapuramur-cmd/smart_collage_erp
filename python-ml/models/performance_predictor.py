import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

class PerformancePredictor:
    def __init__(self):
        self.model = None
        self.load_or_train_model()

    def load_or_train_model(self):
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
        else:
            self._train_dummy_model()

    def _train_dummy_model(self):
        # Fallback dummy training if no model file exists
        X_dummy = np.random.rand(100, 5) * 100
        # Categories: 0: At Risk, 1: Average, 2: High Performer
        y_dummy = np.random.randint(0, 3, 100)
        self.model = RandomForestClassifier(n_estimators=10)
        self.model.fit(X_dummy, y_dummy)
        joblib.dump(self.model, MODEL_PATH)

    def predict(self, attendance, internal, assignment, quiz, prev_gpa):
        if not self.model:
            raise Exception("Model not loaded.")
        
        # Scale prev_gpa to 0-100 roughly for dummy model
        features = np.array([[attendance, internal, assignment, quiz, prev_gpa * 10]])
        pred_idx = self.model.predict(features)[0]
        probas = self.model.predict_proba(features)[0]
        
        categories = ["At Risk", "Average Performer", "High Performer"]
        
        return {
            "category": categories[pred_idx],
            "confidence_score": round(float(np.max(probas)), 4)
        }

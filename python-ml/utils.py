import numpy as np

def normalize_features(features):
    """
    Utility function to normalize features before prediction.
    """
    return np.clip(features, 0, 100) / 100.0

def validate_input(val, min_val=0, max_val=100):
    """
    Validate numerical input range.
    """
    return min_val <= val <= max_val

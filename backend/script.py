import sys
import json
import joblib
import numpy as np

model = joblib.load("model.pkl")


def predict(data):
    data = np.array(data["data"]).reshape(-1, 1)
    preds = model.predict(data)
    return preds.tolist()


input_data = json.loads(sys.stdin.read())
output = predict(input_data)
print(json.dumps(output))

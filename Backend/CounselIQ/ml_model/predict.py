import joblib
import pandas as pd

pipeline = joblib.load('admission_pipeline.joblib')

cutoff_df = pd.read_csv('data/dataset.csv') 

college_name = "AIIMS Delhi"
stream = "MBBS"
exam_type = "NEET"
category = "OBC"
user_marks = 700

match = cutoff_df[
    (cutoff_df['college_name'] == college_name) &
    (cutoff_df['stream'] == stream) &
    (cutoff_df['exam_type'] == exam_type) &
    (cutoff_df['category'] == category)
]

if match.empty:
    raise ValueError("No matching cutoff found for the given input!")

cutoff_2024 = match.iloc[0]['cutoff_2024']
cutoff_2023 = match.iloc[0]['cutoff_2023']
cutoff_2022 = match.iloc[0]['cutoff_2022']

data = {
    "college_name": [college_name],
    "stream": [stream],
    "exam_type": [exam_type],
    "category": [category],
    "user_marks": [user_marks],
    "cutoff_2024": [cutoff_2024],
    "cutoff_2023": [cutoff_2023],
    "cutoff_2022": [cutoff_2022]
}

df = pd.DataFrame(data)

prediction = pipeline.predict(df)

print(f"Prediction for given input: {prediction[0]}")
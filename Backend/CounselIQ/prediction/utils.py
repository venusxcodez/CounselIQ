import pandas as pd
import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), "admission_pipeline.joblib")
pipeline = joblib.load(model_path)

dataset_path = os.path.join(os.path.dirname(__file__), "data", "dataset.csv")
cutoff_df = pd.read_csv(dataset_path)

def get_prediction(college_name, streams, exam_type, category, user_marks):
    results = {"predictions": []}

    for stream in streams:
        match = cutoff_df[
            (cutoff_df['college_name'].str.strip().str.title() == college_name.strip().title()) &
            (cutoff_df['stream'].str.strip() == stream.strip()) &
            (cutoff_df['exam_type'].str.strip().str.upper() == exam_type.strip().upper()) &
            (cutoff_df['category'].str.strip().str.title() == category.strip().title())
        ]

        if match.empty:
            results['predictions'].append({
                "stream": stream,
                "error": "No matching cutoff found"
            })
            continue

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

        results['predictions'].append({
            "stream": stream,
            "prediction": prediction[0]
        })

    return results
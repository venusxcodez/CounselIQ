import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
import joblib

df = pd.read_csv('data/dataset.csv')
# print(df.head())

x = df.drop(columns=['chances_of_admission'])
y = df['chances_of_admission']

categorical_cols = ['college_name', 'stream', 'exam_type', 'category']
numeric_cols = [col for col in x.columns if col not in categorical_cols]

categorical_transformer = OneHotEncoder(handle_unknown='ignore')
numeric_transformer = StandardScaler()

preprocesser = ColumnTransformer(
    transformers= [
        ('cat', categorical_transformer, categorical_cols),
        ('num', numeric_transformer, numeric_cols)
    ]
)

model = RandomForestRegressor(n_estimators=100,random_state=42)

pipeline = Pipeline(steps=[
    ('preprocessor', preprocesser),
    ('regressor',model)
])

x_train,x_test,y_train,y_test = train_test_split(
    x,y,test_size=0.2,random_state=42
)

pipeline.fit(x_train,y_train)

score = pipeline.score(x_test, y_test)
print(f"Model R² Score: {score:.2f}")

joblib.dump(pipeline,'admission_pipeline.joblib')

print('Training complete! Pipeline Saved.')
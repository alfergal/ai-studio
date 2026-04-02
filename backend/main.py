from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model.joblib")


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/predict")
def predict(data: dict):
    sex = 1 if data["sex"] == "female" else 0
    age = float(data["age"])

    pclass = int(data.get("pclass", 3))
    fare = float(data.get("fare", 10))
    family_size = int(data.get("familySize", 1))

    input_df = pd.DataFrame([{
        "Pclass": pclass,
        "Sex": sex,
        "Age": age,
        "Fare": fare,
        "FamilySize": family_size
    }])

    prediction = model.predict(input_df)[0]

    return {
        "prediction": "Survived" if prediction == 1 else "Did not survive"
    }
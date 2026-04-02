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

model, features = joblib.load("model.joblib")

@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/predict")
def predict(data: dict):
    try:
        print("INPUT:", data)

        sex = 1 if data["sex"] == "female" else 0
        age = float(data["age"])

        pclass = int(data.get("pclass", 3))
        fare = float(data.get("fare", 10))
        family_size = int(data.get("familySize", 1))

        is_alone = 1 if family_size == 1 else 0
        fare_per_person = fare / family_size if family_size > 0 else fare
        title = 1
        age_bin = int(age // 10)

        input_df = pd.DataFrame([{
            "Pclass": pclass,
            "Sex": sex,
            "Age": age,
            "Fare": fare,
            "FamilySize": family_size,
            "IsAlone": is_alone,
            "FarePerPerson": fare_per_person,
            "Title": title,
            "AgeBin": age_bin
        }])[features]

        print("DF:", input_df)

        prediction = model.predict(input_df)[0]
        proba = model.predict_proba(input_df)[0][1]

        return {
            "prediction": "Survived" if prediction == 1 else "Did not survive",
            "probability": round(float(proba), 3)
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}
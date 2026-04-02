import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("data/train.csv")

df = df[["Survived", "Pclass", "Sex", "Age", "Fare", "SibSp", "Parch"]]

df["Age"] = df["Age"].fillna(df["Age"].median())
df["Fare"] = df["Fare"].fillna(df["Fare"].median())

df["Sex"] = df["Sex"].map({"male": 0, "female": 1})

df["FamilySize"] = df["SibSp"] + df["Parch"] + 1

df = df.drop(["SibSp", "Parch"], axis=1)

X = df.drop("Survived", axis=1)
y = df["Survived"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

joblib.dump(model, "model.joblib")

print("Model trained")
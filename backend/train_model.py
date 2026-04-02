import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("data/train.csv")
df = df[["Survived", "Pclass", "Sex", "Age", "Fare", "SibSp", "Parch", "Name"]]

df["Age"] = df["Age"].fillna(df["Age"].median())
df["Fare"] = df["Fare"].fillna(df["Fare"].median())

df["Sex"] = df["Sex"].map({"male": 0, "female": 1})

df["FamilySize"] = df["SibSp"] + df["Parch"] + 1
df["IsAlone"] = (df["FamilySize"] == 1).astype(int)

df["FarePerPerson"] = df["Fare"] / df["FamilySize"]

df["Title"] = df["Name"].str.extract(r" ([A-Za-z]+)\.", expand=False)

df["Title"] = df["Title"].replace(
    ['Lady', 'Countess','Capt','Col','Don','Dr','Major','Rev','Sir','Jonkheer','Dona'],
    'Rare'
)

df["Title"] = df["Title"].replace({'Mlle': 'Miss', 'Ms': 'Miss', 'Mme': 'Mrs'})

df["Title"] = df["Title"].map({
    'Mr': 1, 'Miss': 2, 'Mrs': 3, 'Master': 4, 'Rare': 5
}).fillna(0)

df["AgeBin"] = pd.cut(df["Age"], bins=5, labels=False)

# --- DROP ---
df = df.drop(["SibSp", "Parch", "Name"], axis=1)

# --- TRAIN ---
X = df.drop("Survived", axis=1)
y = df["Survived"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=6,
    random_state=42
)

model.fit(X_train, y_train)

joblib.dump((model, X.columns.tolist()), "model.joblib")

print("Model trained")
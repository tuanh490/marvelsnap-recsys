from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from recommender import recommend_cards

app = FastAPI()


class PredictionRequest(BaseModel):
    cards: list[str]


df_card = pd.read_csv("./dataset/cards.csv")
df_deck = pd.read_csv("./dataset/decks.csv")
cos_sim_df = pd.read_csv("./dataset/matrix.csv")
cos_sim_df = cos_sim_df.set_index(cos_sim_df.columns[0])


@app.post("/predict")
def predict(req: PredictionRequest):
    cards = req.cards

    df_user = pd.DataFrame(columns=df_deck.columns)
    df_user.loc[0] = np.zeros(len(df_deck.columns))
    for card in cards:
        df_user.loc[:, card] = 1

    recommendations = recommend_cards(
        df_user.iloc[0, :], cos_sim_df, df_deck.iloc[:, 4:].columns
    )

    if recommendations is None:
        raise HTTPException(status_code=404, detail="Card not found")

    return {"recommendations": recommendations}

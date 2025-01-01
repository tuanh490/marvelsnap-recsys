from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from recommender import recommend_decks

app = FastAPI()


class PredictionRequest(BaseModel):
    cards: list[str]
    collection: list[str]
    n_decks: int


# Load datasets
df_card = pd.read_csv("./dataset/cards.csv")
df_deck = pd.read_csv("./dataset/decks.csv")
cos_sim_df = pd.read_csv("./dataset/matrix.csv")
cos_sim_df = cos_sim_df.set_index(cos_sim_df.columns[0])


@app.post("/predict")
def predict(req: PredictionRequest):
    cards = req.cards
    collection = req.collection
    n_decks = req.n_decks

    invalid_cards = [card for card in cards if card not in df_deck.columns]
    if invalid_cards:
        raise HTTPException(status_code=400, detail=f"Invalid cards: {invalid_cards}")

    df_user = pd.DataFrame(columns=df_deck.columns)
    df_user.loc[0] = np.zeros(len(df_deck.columns))
    for card in cards:
        df_user.loc[:, card] = 1

    valid_collection = [card for card in collection if card in cos_sim_df.columns]
    if not valid_collection:
        raise HTTPException(
            status_code=400,
            detail="No valid cards in the collection for recommendations.",
        )

    try:
        recommendations = recommend_decks(
            df_user.iloc[0, :], cos_sim_df, valid_collection, n_decks
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating recommendations: {str(e)}"
        )

    return {"recommendations": recommendations}


class predictForAllRequest(BaseModel):
    cards: list[str]
    n_decks: int


@app.post("/predictForAll")
def predictForAll(req: predictForAllRequest):
    cards = req.cards
    n_decks = req.n_decks

    invalid_cards = [card for card in cards if card not in df_deck.columns]
    if invalid_cards:
        raise HTTPException(status_code=400, detail=f"Invalid cards: {invalid_cards}")

    df_user = pd.DataFrame(columns=df_deck.columns)
    df_user.loc[0] = np.zeros(len(df_deck.columns))
    for card in cards:
        df_user.loc[:, card] = 1

    try:
        recommendations = recommend_decks(
            df_user.iloc[0, :], cos_sim_df, df_deck.iloc[:, 4:].columns, n_decks
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating recommendations: {str(e)}"
        )

    return {"recommendations": recommendations}

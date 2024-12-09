from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI()


class PredictionRequest(BaseModel):
    cards: list


df_card = pd.read_csv("./dataset/cards.csv")
df_deck = pd.read_csv("./dataset/decks.csv")
cos_sim_df = pd.read_csv("./dataset/matrix.csv")
cos_sim_df = cos_sim_df.set_index(cos_sim_df.columns[0])

df_deck_cards_only = df_deck.iloc[:, 4:]


def recommend_cards(cards_specified, cos_sim_df, cards=df_deck_cards_only.columns):
    user_cards = cards_specified[cards_specified == 1].index.tolist()
    top_n = 12 - len(user_cards)

    for _ in range(top_n):
        predicted_scores = {}
        for card in cards:
            if card not in user_cards:
                similar_cards = cos_sim_df[card]
                weighted_sum = 0
                sim_sum = 0

                for user_card in user_cards:
                    weighted_sum += similar_cards[user_card]
                    sim_sum += 1

                predicted_scores[card] = weighted_sum / sim_sum if sim_sum > 0 else 0

        recommendations = max(predicted_scores, key=predicted_scores.get)
        user_cards.append(recommendations)

    return user_cards


@app.post("/predict")
def predict(req: PredictionRequest):
    cards = req.cards

    df_user = pd.DataFrame(columns=df_deck.columns)
    df_user.loc[0] = np.zeros(len(df_deck.columns))
    cards = ["Magik"]
    for card in cards:
        df_user.loc[:, card] = 1

    recommendations = recommend_cards(
        df_user.iloc[0, :], cos_sim_df, df_deck_cards_only.columns
    )

    if recommendations is None:
        raise HTTPException(
            status_code=404, detail="Card not found in correlation matrix"
        )

    return {"recommendations": recommendations}

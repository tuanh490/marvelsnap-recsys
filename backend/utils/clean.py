import pandas as pd

df = pd.read_csv("../dataset/cards.csv")

df.loc[:, "description"] = df.loc[:, "description"].str.replace(
    r"<[^>]*>", "", regex=True
)

df.loc[:, "description"] = (
    df.loc[:, "description"].astype(str).str.replace(r'"', "", regex=True)
)

df.to_csv("../dataset/cleaned_cards.csv", index_label=None)

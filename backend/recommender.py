def recommend_cards(cards_specified, cos_sim_df, cards):
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

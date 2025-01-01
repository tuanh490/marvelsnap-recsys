def recommend_decks(cards_specified, cos_sim_df, cards, n_decks=1):
    user_cards = cards_specified[cards_specified == 1].index.tolist()
    top_n = 12 - len(user_cards)
    decks = []
    excluded_recommendations = set(user_cards)

    for _ in range(n_decks):
        current_deck = user_cards[:]
        recommended_cards = []

        for i in range(top_n):
            predicted_scores = {}
            for card in cards:
                if i == 0 and card in excluded_recommendations:
                    continue
                elif card not in current_deck:
                    similar_cards = cos_sim_df[card]
                    weighted_sum = 0
                    sim_sum = 0

                    for user_card in current_deck:
                        weighted_sum += similar_cards[user_card]
                        sim_sum += 1

                    predicted_scores[card] = (
                        weighted_sum / sim_sum if sim_sum > 0 else 0
                    )

            if not predicted_scores:
                break

            recommended_card = max(predicted_scores, key=predicted_scores.get)
            recommended_cards.append(recommended_card)
            current_deck.append(recommended_card)
            excluded_recommendations.add(recommended_card)

        decks.append(current_deck)

    return decks

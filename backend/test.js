import base64 from 'base64-js';

class DeckListError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

    static EncodingError() {
        return new DeckListError("Failed to encode bytes");
    }

    static DecodingError() {
        return new DeckListError("Failed to decode data as base64");
    }

    static InvalidDeckInput() {
        return new DeckListError("Invalid data");
    }
}

class Card {
    constructor(name) {
        this.cardDefId = name;
    }
}

class DeckList {
    constructor() {
        this.name = "";
        this.cards = [];
    }

    // Create a new empty DeckList
    static new() {
        return new DeckList();
    }

    // Set the deck name
    setName(name) {
        this.name = name;
    }

    // Get the deck name
    getName() {
        return this.name;
    }

    // Set the list of cards
    setCards(cards) {
        this.cards = cards.map((cardName) => new Card(cardName));
    }

    // Get the list of cards
    getCards() {
        return this.cards.map((card) => card.cardDefId);
    }

    // Convert a string (base64) to a DeckList
    static fromCode(code) {
        try {
            const decodedData = base64.toByteArray(code);
            const jsonString = new TextDecoder().decode(decodedData);
            const json = JSON.parse(jsonString);
            const deckList = new DeckList();
            deckList.setName(json.name);
            deckList.setCards(json.cards.map((card) => card.cardDefId));
            return deckList;
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw DeckListError.InvalidDeckInput();
            }
            throw DeckListError.DecodingError();
        }
    }

    // Convert DeckList to a base64 string
    intoCode() {
        try {
            const json = JSON.stringify({
                name: this.name,
                cards: this.cards,
            });
            const jsonData = new TextEncoder().encode(json);
            return base64.fromByteArray(jsonData);
        } catch (error) {
            throw DeckListError.EncodingError();
        }
    }
}

// Example usage:
const VALID_CODE =
    "eyJOYW1lIjoiVGhhbm9zIiwiQ2FyZHMiOlt7IkNhcmREZWZJZCI6IkFudE1hbiJ9LHsiQ2FyZERlZklkIjoiQWdlbnQxMyJ9LHsiQ2FyZERlZklkIjoiUXVpbmpldCJ9LHsiQ2FyZERlZklkIjoiQW5nZWxhIn0seyJDYXJkRGVmSWQiOiJPa295ZSJ9LHsiQ2FyZERlZklkIjoiQXJtb3IifSx7IkNhcmREZWZJZCI6IkZhbGNvbiJ9LHsiQ2FyZERlZklkIjoiTXlzdGlxdWUifSx7IkNhcmREZWZJZCI6IkxvY2tqYXcifSx7IkNhcmREZWZJZCI6IkthWmFyIn0seyJDYXJkRGVmSWQiOiJEZXZpbERpbm9zYXVyIn0seyJDYXJkRGVmSWQiOiJUaGFub3MifV19";

// Decoding example
try {
    const list = DeckList.fromCode(VALID_CODE);
    console.log(list.getName()); // "Thanos"
    console.log(list.getCards()); // Array of card names
} catch (error) {
    console.error(error.message);
}

// Encoding example
try {
    const list = DeckList.new();
    list.setName("Thanos");
    list.setCards([
        "Wong",
        "Agent13",
        "Quinjet",
        "Angela",
        "Okoye",
        "Armor",
        "Falcon",
        "Mystique",
        "Lockjaw",
        "KaZar",
        "DevilDinosaur",
        "Thanos",
    ]);
    const encoded = list.intoCode();
    console.log(encoded); // Base64 encoded string
} catch (error) {
    console.error(error.message);
}

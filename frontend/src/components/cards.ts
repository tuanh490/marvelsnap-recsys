interface DeckProps {
  name: string;
  art: string;
  cost: number;
  power: number;
  ability: string;
  series: string;
}

const cards: Array<DeckProps> = [
    {
      name: "Juggernaut",
      cost: 3,
      power: 3,
      ability: "On Reveal: If your opponent played cards here this turn, move them randomly.",
      series: "Series3",
      art: "https://static.marvelsnap.pro/cards/Juggernaut.webp"
    },
    {
      name: "Kang",
      cost: 5,
      power: 0,
      ability: "On Reveal: Look at what your opponent did, then restart the turn. (without Kang)",
      series: "Series5",
      art: "https://static.marvelsnap.pro/cards/Kang.webp"
    },
    {
      name: "Ka-Zar",
      cost: 4,
      power: 4,
      ability: "Ongoing: Your 1-Cost cards have +1 Power.",
      series: "Series0",
      art: "https://static.marvelsnap.pro/cards/KaZar.webp"
    },
    {
      name: "Killmonger",
      cost: 3,
      power: 3,
      ability: "On Reveal: Destroy ALL 1-Cost cards.",
      series: "Series2",
      art: "https://static.marvelsnap.pro/cards/Killmonger.webp"
    },
    {
      name: "Kingpin",
      cost: 3,
      power: 4,
      ability: "When a card moves here on turn 6, destroy it.",
      series: "Series3",
      art: "https://static.marvelsnap.pro/cards/Kingpin.webp"
    },
    {
      name: "Kitty Pryde",
      cost: 1,
      power: 0,
      ability: "When this returns to your hand, +1 Power. Returns at the start of each turn.",
      series: "Series5",
      art: "https://static.marvelsnap.pro/cards/KittyPryde.webp"
    },
    {
      name: "Klaw",
      cost: 5,
      power: 4,
      ability: "Ongoing: The location to the right has +6 Power.",
      series: "Series1",
      art: "https://static.marvelsnap.pro/cards/Klaw.webp"
    },
    {
      name: "Knull",
      cost: 6,
      power: 0,
      ability: "Ongoing: Has the combined Power of all cards destroyed this game.",
      series: "Series4",
      art: "https://static.marvelsnap.pro/cards/Knull.webp"
    },
    {
      name: "Korg",
      cost: 1,
      power: 2,
      ability: "On Reveal: Shuffle a Rock into your opponent's deck.",
      series: "Series1",
      art: "https://static.marvelsnap.pro/cards/Korg.webp"
    },
    {
      name: "Kraven",
      cost: 2,
      power: 2,
      ability: "When a card moves here, this gains +2 Power.",
      series: "Series1",
      art: "https://static.marvelsnap.pro/cards/Kraven.webp"
    },
    {
      name: "Lady Deathstrike",
      cost: 5,
      power: 4,
      ability: "On Reveal: Destroy each card here with less Power than this.",
      series: "Series5",
      art: "https://static.marvelsnap.pro/cards/LadyDeathstrike.webp"
    },
    {
      name: "Lady Sif",
      cost: 3,
      power: 5,
      ability: "On Reveal: Discard the highest-cost card from your hand.",
      series: "Series1",
      art: "https://static.marvelsnap.pro/cards/LadySif.webp"
    },
];

export default cards;
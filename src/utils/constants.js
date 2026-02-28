export const TYPE_COLORS = {
  normal:   "#A8A878",
  fire:     "#F08030",
  water:    "#6890F0",
  electric: "#F8D030",
  grass:    "#78C850",
  ice:      "#98D8D8",
  fighting: "#C03028",
  poison:   "#A040A0",
  ground:   "#E0C068",
  flying:   "#A890F0",
  psychic:  "#F85888",
  bug:      "#A8B820",
  rock:     "#B8A038",
  ghost:    "#705898",
  dragon:   "#7038F8",
  dark:     "#705848",
  steel:    "#B8B8D0",
  fairy:    "#EE99AC",
};

export const STAT_LABELS = {
  hp:                "HP",
  attack:            "ATK",
  defense:           "DEF",
  "special-attack":  "SP.ATK",
  "special-defense": "SP.DEF",
  speed:             "SPD",
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

export const ARTWORK_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const FALLBACK_SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

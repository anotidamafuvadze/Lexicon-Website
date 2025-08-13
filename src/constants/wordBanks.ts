const wordBank = [
  // ======================= DEFAULT =======================
  {
    name: "default",
    words: [
      "ABLE", "ACID", "AGED", "AIDE", "BACK", "BAKE", "BALD", "BALL",
      "BEAM", "BEAM", "BEAN", "BELL", "BEND", "BIKE", "CAFE", "CAGE",
      "CAKE", "CALM", "CAME", "CELL", "CHEF", "CLAM", "DEAL", "DECK",
      "DEED", "DIAL", "DICE", "DIME", "EACH", "EDGE", "FACE", "FADE",
      "FAIL", "FAKE", "FALL", "FAME", "FEED", "FEEL", "FELL", "FILE",
      "FILL", "FILM", "FIND", "FINE", "FLEA", "FLED", "GALA", "GALE",
      "GALL", "GAME", "GEEK", "HAIL", "HALE", "HALF", "HALL", "HEAD",
      "HEAL", "HEED", "HEEL", "HELD", "HILL", "IDEA", "JAIL", "JIBE",
      "LACE", "LAID", "LAKE", "LAMB", "LAME", "LEAD", "LEAF", "LEAK",
      "LEEK", "MAID", "MAIL", "MAKE", "MALE", "MALL", "MEAD", "MEAL",
      "MEEK", "MILD",
    ],
  },

  // ======================= EASY =======================
  {
    name: "easy",
    words: [
      "ABLE", "ACED", "ACID", "AGED", "AIDE", "ALGA", "BABE", "BACK",
      "BADE", "BAKE", "BALD", "BARK", "BEEF", "BEAD", "BIDE", "CAFE",
      "CAGE", "CAKE", "CALF", "CAME", "DADA", "DAME", "DEAD", "DEAF",
      "DEAL", "DEED", "EACH", "EDGE", "FADE", "FACE", "FAME", "FEED",
      "FEEL", "FELL", "FLEA", "GAGA", "GAGE", "GALA", "GALE", "GAME",
    ],
  },

  // ======================= NORMAL =======================
  {
    name: "normal",
    words: [
      "ABLE", "ACID", "AGED", "AIDE", "BACK", "BAKE", "BALD", "BALL",
      "BEAM", "BEAN", "BELL", "BEND", "BIKE", "CAFE", "CAGE", "CAKE",
      "CALM", "CAME", "CELL", "CHEF", "CLAM", "DEAL", "DECK", "DEED",
      "DIAL", "DICE", "DIME", "EACH", "EDGE", "FACE", "FADE", "FAIL",
      "FAKE", "FALL", "FAME", "FEED", "FEEL", "FELL", "FILE", "FILL",
      "FILM", "FIND", "FINE", "FLEA", "FLED", "GALA", "GALE", "GALL",
      "GAME", "GEEK", "HAIL", "HALE", "HALF", "HALL", "HEAD", "HEAL",
      "HEED", "HEEL", "HELD", "HILL", "IDEA", "JAIL", "JIBE", "LACE",
      "LAID", "LAKE", "LAMB", "LAME", "LEAD", "LEAF", "LEAK", "LEEK",
      "MAID", "MAIL", "MAKE", "MALE", "MALL", "MEAD", "MEAL", "MEEK",
      "MILD",
    ],
  },

  // ======================= HARD =======================
  {
    name: "hard",
    words: [
      "BARK", "CAPE", "CASH", "CASK", "COAL", "COLD", "CONE", "DAMP", "DARK", "DATE",
      "DEEP", "DOME", "EARN", "EAST", "FANG", "FARM", "FIRM", "GAPE", "GEAR", "GONE",
      "HAIR", "HAND", "HARD", "HERB", "HERE", "HERO", "HINT", "HOLE", "HOME", "HOOD",
      "HOPE", "IDLE", "IRON", "JEEP", "JERK", "JOCK", "JOKE", "JOLT", "KEPT", "KNOB",
      "LAST", "LATE", "LEFT", "LENT", "LICE", "LIKE", "LIMB", "LIME", "LOAD", "LOAF",
      "LOCK", "LOGE", "LONG", "MACE", "MADE", "MALT", "MAPS", "MARA", "MARK", "MART",
      "MASH", "MASK", "MATE", "MEAT", "MEGA", "MELD", "MELT", "MEMO", "MEND", "MERE",
      "MESH", "META", "MICE", "MILK", "MILL", "MIME", "MIND", "MINE", "MINT", "MIRE",
      "MISO", "MODE", "MOLE", "MOLT", "MONK", "MOOD", "MOON", "MORE", "MORN", "MOST",
      "MOTH", "NECK", "NEON", "NEST", "NOON", "NORM", "OMEN", "OPAL", "OPEN", "PACK",
      "PINE", "PINK", "PLAN", "RAMP", "RANG", "RANK", "RINK", "ROOT", "SANG", "SANK",
      "SIGH", "SINK", "SLIM", "SOON",
    ],
  },

  // ======================= NATURE =======================
  {
    name: "nature",
    words: [
      "BARK", "BIRD", "FERN", "FIRE", "GOLD", "HERB", "HILL", "ICED", "IRIS", "LAKE",
      "LAND", "LARK", "LEAF", "LIFE", "LIME", "LOON", "MOON", "OAKS", "PEAK", "REEF",
      "REED", "RIFF", "RISE", "RILL", "ROCK", "SAGE", "SAND", "SEAL", "SEAS",
    ],
  },

  // ======================= FOOD =======================
  {
    name: "food",
    words: [
      "ACAI", "BEEF", "BEAN", "BOAR", "CAKE", "CARP", "CHIP", "CHOP", "CHUB", "CLAM",
      "COKE", "COLA", "COOK", "CRAB", "DACE", "DEER", "DILL", "DISH", "DOLE", "EGGS",
      "FISH", "JELL", "KALE", "LAMB", "LARD", "LEAF", "LIME", "LION", "LOAF", "MACK",
      "MEAL", "MEAT", "MILK", "MISO", "OKRA", "OLIO", "PEAR", "PEAS", "PIES", "PIKE",
      "PORK", "RICE", "SODA", "SOUP", "SPAM",
    ],
  },

  // ======================= ANIMALS =======================
  {
    name: "animals",
    words: [
      "BEAR", "BIRD", "BOAR", "CALF", "CARP", "CLAM", "CRAB", "DEER", "EELS", "ELKS",
      "FISH", "FLEA", "FOAL", "GUAN", "HARE", "HAWK", "HENS", "LAMB", "LARK", "LION",
      "LOON", "MICE", "MINK", "MOLE", "ORCA", "PIKE", "PONY", "RATS", "ROOK", "SEAL",
    ],
  },

  // ======================= STORY =======================
  {
    name: "story",
    words: [
      "PAGE", "BOOK", "ONCE", "EPIC", "HERO", "LINE", "ROLE", "POEM", "EDIT", "LORE",
      "IDEA", "FONT", "READ", "REEL", "FOLD", "JOKE", "FILM", "ITEM", "LEAD", "ARCS",
      "NAME", "CLIP",
    ],
  },
];

export default wordBank;

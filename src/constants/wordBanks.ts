const wordBank = [
  // ======================= DEFAULT =======================
 {
  name: "default",
  words: [
    "ABLE", "ACID", "AGED", "AIDE", "ALOE", "AREA", "BACK", "BAKE",
    "BALD", "BALL", "BAND", "BANK", "BARE", "BARK", "BASE",
    "BEAM", "BEAN", "BEAR", "BEAT", "BEDS", "BELL", "BEND",
    "BEAM", "BIKE", "CAFE", "CAGE", "CAKE", "CALM", "CAME",
    "CARD", "CARE", "CARP", "CASE", "CASH", "CELL", "CHEF",
    "CLAM", "CLAP", "COAL", "CODE", "COIL",
    "COIN", "COME", "COPE", "DARE",, "DASH",
    "DEAL", "DEAR", "DECK", "DEED", "DEEP", "DEER", "DESK", "DIAL",
    "DICE", "DIME", "EACH", "EARL", "EARN", "ECHO", "EDGE", "EGGS",
    "ELSE", "FACE", "FADE", "FAIL", "FAIR", "FAKE", "FALL", "FAME",
    "FARE", "FARM", "FEAR", "FEED", "FEEL", "FEET", "FELL",
    "FILE", "FILL", "FILM", "FIND", "FINE", "FIRE", "FLEA", "FLED",
    "GALA", "GALE", "GALL", "GAME", "GASH", "GEAR", "GONE",
    "HEAD", "HEAL", "HEAP", "HEAR", "HEAT", "HEED", "HEEL", "HELD",
    "HELP", "HERB", "HERD", "HERE", "HAIL", "HAIR", "HALE",
    "HALF", "HALL", "HARE", "HARK", "HARM", "HARP",
    "IDEA", "JAIL", "JEEP", "JERK", "JIBE", "JOKE", "KEEN",
    "KEEP", "KELP", "KNEE", "LACE", "LAID", "LAIR",
    "LAKE", "LAME", "LAND", "LANE", "LASH",  "LEAD", "LEAF",
    "LEAK", "LEAN", "LEAP", "LEEK", "MAKE", "MAID", "MAIL", "MAIN",
    "MALE", "MALL", "MANE", "MARE", "MASH", "MEAD",
    "MEAL", "MEAN", "MEEK", "MERE", "MESH",
    "SAFE", 
  ]
},


  // ======================= EASY =======================
  {
    name: "easy",
    words: [
      "ABLE", "ACED", "ACID", "AGED", "AIDE", "ALGA", "BABE", "BACK", "BADE", "BAKE", 
      "BALD", "BALL", "BAND", "BARK", "BEEF", "BEAD", "BIDE", "CAFE", "CAGE", "CAKE", 
      "CALF", "CALL", "CALM", "CAME", "CANE", "CARD", "CARE", "DADA", "DAFF", "DAME", 
      "DEAD", "DEAF", "DEAL", "DEAN", "DEAR", "DEED", "DEER", "EACH", "EARL", "EASE", 
      "EDGE", "FADE", "FACE", "FAME", "FARE", "FEAR", "FEED", "FEEL", "FELL", "FLEA",
      "GAGA", "GAGE", "GAIN", "GALA", "GALE", "GALL", "GAME", "GEAR"
    ],
  },

  // ======================= NORMAL =======================
  {
    name: "normal",
    words: [
      "GEEK", "HALL", "HILL", "HIVE", "HOLD", "HOLE", "HOOD", "JOGS", "JOKE", "JAIL",
      "KING", "KITE", "KEEN", "LOOK", "LOCK", "LEND", "LION", "LONG", "GLOW", "GONE",
      "HANG", "HOOK", "LOGS", "JAZZ", "JURY", "JOLT", "KILN", "KNOB",
      "LAMB", "LUSH", "LULL", "MILD", "MELT", "MINT", "NODE", "NOVA", "OATH", "OBEY",
      "PEAK", "PEAR", "PEEL", "POND", "PUFF", "QUIZ", "RAFT", "REED", "ROAM", "RUST",
      "SASH", "TINT", "TURF", "VAIN", "VIBE", "WADE", "YANK", "ZEST"
    ],
  },

  // ======================= HARD =======================
  {
    name: "hard",
    words: [
      "MOOD", "MOON", "MIND", "MASK", "MAIN", "MARK", "NORM", "NOON", "NEST", "NEON",
      "NECK", "OPEN", "OMEN", "OPAL", "PINE", "PINK", "PLAN", "PACK", "POUR", "QUAD",
      "QUIT", "QUIP", "RAMP", "RANK", "RANG", "RINK", "ROOT", "SANG", "SANK", "SINK",
      "SOON", "SIGH", "SLIM", "UVEA", "VAIN", "VEXT", "VIBE", "VICE", "VIEW", "VOLT",
      "VOWE", "WADE", "WAIF", "WANE", "WARP", "WASP", "WAVE", "WAXY", "WHIM", "WILD",
      "WILY", "WISH", "WOLF", "YANK", "YELP", "YOND", "ZEAL", "ZEST"
    ],
  },

  // ======================= NATURE =======================
  {
    name: "nature",
    words: [
      "BARK", "BIRD", "BUSH", "CAVE", "CLOUD", "COVE", "DAWN", "DEWY", "DOVE", "DUNE",
      "DUST", "FERN", "FIRE", "FISH", "FROG", "GOLD", "HAWK", "HERB", "HILL", "ICED",
      "IRIS", "LAKE", "LAND", "LARK", "LEAF", "LIFE", "LILY", "LIME", "LOON", "LUSH",
      "MOON", "MOSS", "MIST", "MULE", "NEST", "OAKS", "PEAT", "PEAK", "POND", "RAIN",
      "REEF", "REED", "RIFF", "RISE", "RILL", "ROCK", "ROOT", "SAGE", "SAND", "SEAL",
      "SEAS", "SKYE", "SNAG", "SNOW", "SOIL", "STAR", "STEM", "STORM", "SWAN", "TIDE",
      "TOAD", "TREE", "TWIG", "VINE", "WAVE", "WILD", "WIND", "WOOD", "WREN"
    ],
  },

  // ======================= FOOD =======================
  {
    name: "food",
    words: [
      "ACAI", "BARS", "BASS", "BEEF", "BEAN", "BITE", "BREW", "BUNS", "CAKE",
      "CARP", "CHIP", "CHOP", "CHUB", "CLAM", "COKE", "COLA", "COOK", "CORN", "CRAB",
      "CURY", "DACE", "DATE", "DEER", "DILL", "DISH", "DOLE", "DRUM", "DUCK", "EGGS",
      "FISH", "FOOD", "FORK", "GOAT", "GRUB",
      "JELL", "JUNK", "KALE", "KIWI", "LAMB", "LARD", "LEAF", "LIME", "LION", "LOAF",
      "MACK", "MEAL", "MEAT", "MILK", "MINT", "MISO", "MUFF", "ZEST", "NUTS", "OATS",
      "OKRA", "OLIO", "PEAR", "PEAS", "PIES", "PIKE", "PITA", "PLUM", "YAMS", "POKE",
      "POPS", "PORK", "RICE", "ROLL", "SALT", "SODA", "SOUP", "SPAM", "WINE", "TACO",
      "TOFU", "TUNA", "VEAL",
    ],
  },

  // ======================= ANIMALS =======================
  {
    name: "animals",
    words: [
      "BASS", "BATS", "BEAR", "BIRD", "BOAR", "CALF", "CARP", "CATS", "CLAM", "CROW",
      "CRAB", "CUBS", "DEER", "DOVE", "DUCK", "EELS", "ELKS", "FISH", "FLEA", "FOAL",
      "FOWL", "FROG", "GNAT", "GOAT", "GUAN", "GULL", "HARE", "HAWK", "HENS", "KITE",
      "KIWI", "LAMB", "LARK", "LION", "LOON", "LYNX", "MICE", "MINK", "MITE", "MOLE",
      "MOTH", "MULE", "NEWT", "ORCA", "OWLS", "PIKE", "PONY", "PUMA", "RATS", "ROOK",
      "SLUG", "SOLE", "SWAN", "TAHR", "TERN", "TICK", "TOAD", "TUNA", "VOLE", "WASP",
      "WOLF", "WORM", "WREN", "YAKS", "SEAL"
    ],
  },

  // ======================= STORY =======================
  {
    name: "story",
    words: [
    "PAGE", "BOOK", "TALE", "ONCE", "WORD", "PLOT", "TEXT", "MYTH", "EPIC", "FATE",
    "HERO", "SAGA", "LINE", "ROLE", "POEM", "EDIT", "NOTE", "LORE", "LIST", "IDEA",
    "FONT", "TYPE", "READ", "CLUE", "TUNE", "REEL", "PLAY", "ACTS", "NEWS", "SHOW",
    "VIEW", "SKIT", "TIER", "FACT", "FOLD", "FLAT", "DOPE", "JOKE", , "COPY", "PULP",
    "FILM", , "HOAX", "ITEM", "LEAD", "ARCS", "LOVE", "TRUE", "NAME", "CLIP"
    ],
  },

];

export default wordBank;

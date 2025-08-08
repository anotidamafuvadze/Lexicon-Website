// ======================= TILE POSITIONING =======================
/**
 * Converts a tile's grid position to pixel coordinates for rendering.
 */
export const getTilePixelPosition = (gridPosition: number, isColumn: boolean): number => {
  const TILE_SIZE_PX = 97;
  const TILE_INSET_PX = isColumn ? 12 : 10;
  return gridPosition * TILE_SIZE_PX + TILE_INSET_PX;
};


// ======================= MERGE POINTS =======================
const POINTS_FROM_MERGE: Record<string, number> = {
  A: 5, B: 10, C: 20, D: 30, E: 40, F: 50, G: 60, H: 70, I: 80, J: 90,
  K: 100, L: 110, M: 120, N: 130, O: 140, P: 150, Q: 160, R: 170, S: 180,
  T: 190, U: 200, V: 210, W: 220, X: 230, Y: 240, Z: 250,
};

// ======================= CONFETTI COLORS =======================
const CONFETTI_COLORS = [
  "#B8D9C4", "#A6CBB3", "#95BD9F", "#85AF8B", "#729F7A",
  "#618967", "#506F56", "#7F9E8A", "#9EB99C", "#B2C8B0",
];

// ======================= GAME SETTINGS =======================
const game = {
  // Board & layout
  TILE_COUNT_PER_DIMENSION: 4,

  // Animations & splash (ms)
  MOVE_ANIMATION_DURATION: 130,
  MERGE_ANIMATION_DURATION: 150,
  POP_ANIMATION_DURATION: 1800,
  SPLASH_TIMEOUT: 500,
  SPLASH_DURATION: 500,
  SHARE_TIMEOUT: 5250,

  // Scoring & pops
  POINTS_FROM_MERGE,
  STARTING_POPS: 3,
  CONTAINER_WIDTH_MOBILE: 288,
  CONTAINER_WIDTH_DESKTOP: 464,

};

export default game;

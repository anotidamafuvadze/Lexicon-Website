// Single tile
export type Tile = {
  id: string;
  position: [number, number];
  value: string;
  justCreated: boolean;
};

// Input for CREATE_TILE
export type PartialTileInput = {
  position?: [number, number];
  value: string;
  justCreated: boolean;
};

// Map of tile IDs to Tile objects
export type TileMap = {
  [id: string]: Tile;
};

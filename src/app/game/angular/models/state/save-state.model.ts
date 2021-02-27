/**
 * The SaveStateModel represents the game state in a flattened format to be used for serialization
 * (probably just JSON.stringify,
 *
 */
export interface SaveStateModel {
  lastUpdated: Date,
  ore: number,
  energy: number,
  drills: number,
  satellites: number,
  drillFactories: number,
  satelliteFactories: number
}

/**
 * The SaveStateTransfer is a reflection of SaveStateModel, but with every parameter being optional.
 * This is done to make it easier for us to write the reducer code for serializing / saving the game, as we can
 * then choose to only update 1 property at a time via Object.assign.
 */
export interface SaveStateTransfer {
  lastUpdated?: Date,
  ore?: number,
  energy?: number,
  drills?: number,
  satellites?: number,
  drillFactories?: number,
  satelliteFactories?: number
}

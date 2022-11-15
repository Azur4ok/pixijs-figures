export enum canvasConfig {
  width = 400,
  height = 400,
}

export enum ellipseConfig {
  WIDTH = 30,
  HEIGHT = 20,
}

export interface CurrentData {
  gravityValue: number
  numberOfCurrentShapes: number
  numberOfCurrentShapesPerSec: number
  numberOfOccupiedArea: number
}

export const DEFAULT_GRAVITY_VALUE = 2
export const RADIUS = 25

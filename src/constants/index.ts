import { Figure } from "../figures"

export interface EnvMutation {
  subject: 'figuresPerSec' | 'gravity'
  operation: string
  value: number
}

export interface Shape extends Figure {
  new (randomInteger: number, y: number, color: number): Shape
}

export interface ShapeInitialData {
  size: [number, number]
  y: number
}

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
export const DEFAULT_FIGURES_PER_SEC_VALUE = 1
export const RADIUS = 25

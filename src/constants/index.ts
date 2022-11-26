import { Figure } from '../figures'

export interface EnvMutation {
  subject: 'figuresPerSec' | 'gravity'
  operation: string
  value: number
}

export interface Shape extends Figure {
  new (randomInteger: number, y: number, color: number): Shape
}

export interface FigureObject {
  name: string
  figure: Figure
  speed: number
  velocityY: number
}

export interface FigureRecord {
  [key: string]: FigureObject
}

export interface ShapeRecord {
  [key: string]: Figure
}

export interface Coords {
  x: number
  y: number
}

export interface ShapeInitialData {
  size: [number, number]
  y: number
}

export enum canvasConfig {
  width = 800,
  height = 600,
}

export enum ellipseConfig {
  WIDTH = 90,
  HEIGHT = 70,
}

export interface CurrentData {
  gravityValue: number
  numberOfCurrentShapes: number
  numberOfCurrentShapesPerSec: number
  numberOfOccupiedArea: number
}

export const DEFAULT_GRAVITY_VALUE = 2
export const DEFAULT_FIGURES_PER_SEC_VALUE = 1
export const RADIUS = 70
export const DELTA = 1.0 / 4

import {
  DEFAULT_GRAVITY_VALUE,
  DEFAULT_FIGURES_PER_SEC_VALUE,
  EnvMutation,
  FigureObject,
  Coords,
  FigureRecord,
} from '../constants'
import { ShapesPool } from './../ShapesPool/index'

export class Model {
  public figures: FigureRecord = {}
  public gravity: number = DEFAULT_GRAVITY_VALUE
  public figuresPerSec: number = DEFAULT_FIGURES_PER_SEC_VALUE
  private pool: ShapesPool
  private randomShapeCoords: Coords
  private indexToDestroy: string
  counterToCreate: number = 0

  constructor() {
    this.pool = new ShapesPool()
    this.randomShapeCoords = null!
    this.indexToDestroy = null!
  }

  setNewRandomShapeCoords(coords: Coords): void {
    this.randomShapeCoords = coords
  }

  createRandomShape(coords?: Coords): FigureObject {
    let shapeName = `shape${Math.floor(Math.random() * 300)}`
    while (this.figures[shapeName]) {
      shapeName = `shape${Math.floor(Math.random() * 300)}`
    }
    let velocity = 0
    const shape = this.pool.borrowShape()

    console.log(shape.x, coords?.x)

    if (coords) {
      velocity = coords.y
      shape.setXCoord(coords.x)
      shape.setYCoord(coords.y)
    }

    console.log(shape.x)

    return {
      name: shapeName,
      figure: shape,
      velocityY: velocity,
      speed: 0,
    } as FigureObject
  }

  setIndexToDestroy(index: string): void {
    this.indexToDestroy = index
  }

  changeEnv(data: EnvMutation): number {
    const { subject, value, operation } = data

    switch (operation) {
      case 'add':
        this[subject] += value
        break
      case 'subtract':
        this[subject] -= value
        break
      default:
        return this[subject]
    }

    return this[subject]
  }

  update(delta: number): FigureRecord {
    for (let name in this.figures) {
      if (this.figures[name].velocityY > 600 + this.figures[name].figure.height) {
        this.pool.returnShape(this.figures[name].figure)
        delete this.figures[name]
      } else {
        this.figures[name].speed += delta * this.gravity
        this.figures[name].velocityY += this.figures[name].speed + (this.gravity * delta) / 2
      }
    }

    if (this.counterToCreate > 1 / this.figuresPerSec) {
      const newShape = this.createRandomShape()

      this.figures[newShape.name] = newShape
      this.counterToCreate = 0
    } else {
      this.counterToCreate += delta
    }

    if (this.randomShapeCoords !== null) {
      const newShape = this.createRandomShape(this.randomShapeCoords)
      this.figures[newShape.name] = newShape
      this.randomShapeCoords = null!
    }

    if (this.indexToDestroy !== null && this.figures[this.indexToDestroy]) {
      this.pool.returnShape(this.figures[this.indexToDestroy].figure)
      delete this.figures[this.indexToDestroy]
      this.indexToDestroy = null!
    }
    return this.figures
  }
}

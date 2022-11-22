import { Figure } from '../figures/Figure'
import {
  DEFAULT_GRAVITY_VALUE,
  DEFAULT_FIGURES_PER_SEC_VALUE,
  EnvMutation,
  figureObject,
  Coords,
} from '../constants'
import { ShapesPool } from './../ShapesPool/index'

export class Model {
  public figures: figureObject[] = []
  public gravity: number = DEFAULT_GRAVITY_VALUE
  public figuresPerSec: number = DEFAULT_FIGURES_PER_SEC_VALUE
  private pool: ShapesPool
  private randomShapeCoords: Coords
  private indexToDestroy: number
  counterToCreate: number = 0

  constructor() {
    this.pool = new ShapesPool()
    this.randomShapeCoords = null!
    this.indexToDestroy = null!
  }

  setNewRandomShapeCoords(coords: Coords): void {
    this.randomShapeCoords = coords
  }

  createRandomShape(coords?: Coords): figureObject {
    let shapeName = `shape${Math.floor(Math.random() * 300)}`
    for (let i = 0; i < this.figures.length; i++) {
      if (this.figures[i]['name'] === shapeName) {
        shapeName = `shape${Math.floor(Math.random() * 300)}`
      }
    }

    const shape = this.pool.borrowShape()
    if (coords) {
      shape.x = coords.x
      shape.y = coords.y
    }

    return {
      name: shapeName,
      figure: shape,
      velocityY: 0,
      speed: 0,
    }
  }

  setIndexToDestroy(index: number): void {
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

  update(delta: number): figureObject[] {
    for (let i = 0; i < this.figures.length; i++) {
      if (this.figures[i].velocityY > 600 + this.figures[i].figure.height) {
        this.pool.returnShape(this.figures[i].figure)
        this.figures.splice(i, 1)
      } else {
        this.figures[i].speed += delta * this.gravity
        this.figures[i].velocityY += this.figures[i].speed + (this.gravity * delta * delta) / 2
      }

      if (this.counterToCreate > 1 / this.figuresPerSec) {
        const newShape = this.createRandomShape()
        this.figures[i] = newShape
        this.counterToCreate = 0
      } else {
        this.counterToCreate += delta
      }

      if (this.randomShapeCoords !== null) {
        this.figures[i] = this.createRandomShape(this.randomShapeCoords)
        this.randomShapeCoords = null!
      }

      if (this.indexToDestroy !== null && this.figures[this.indexToDestroy]) {
        this.pool.returnShape(this.figures[this.indexToDestroy].figure)
        this.figures.splice(this.indexToDestroy, 1)
        this.indexToDestroy = null!
      }
    }
    return this.figures
  }
}

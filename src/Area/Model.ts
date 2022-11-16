import { Figure } from '../figures/Figure'
import { Container } from 'pixi.js'
import { DEFAULT_GRAVITY_VALUE, DEFAULT_FIGURES_PER_SEC_VALUE } from '../constants'
import { ShapesPool } from './../ShapesPool/index'

export class Model {
  public figures: Figure[] = []
  public gravity: number = DEFAULT_GRAVITY_VALUE
  public figuresPerSec: number = DEFAULT_FIGURES_PER_SEC_VALUE
  container: Container
  pool: ShapesPool

  constructor() {
    this.container = new Container()
    this.pool = new ShapesPool()
  }

  createShapes(i: number) {
    this.figures[i] = this.pool.borrowShape()

    this.container.addChild(this.figures[i])
  }

  increaseGravityValue() {
    this.gravity += 1
    return this.gravity
  }

  decreaseGravityValue() {
    this.gravity -= 1
    return this.gravity
  }

  increaseFiguresPerSec() {
    this.figuresPerSec += 1
    return this.figuresPerSec
  }

  decreaseFiguresPerSec() {
    this.figuresPerSec -= 1
    return this.figuresPerSec
  }

  getContainer() {
    return this.container
  }

  update(delta: number) {
    if (this.figures.length < this.figuresPerSec) {
      for (let i = 0; i < this.figuresPerSec; i++) {
        this.createShapes(i)
      }
    } else {
      for (let i = 0; i < this.figuresPerSec; i++) {
        if (this.figures[i].y <= 550) {
          this.figures[i].update(this.gravity, delta)
        } else {
          this.container.removeChild(this.figures[i])
          this.figures.splice(i, 1)
          this.pool.returnShape(this.figures[i])
        }
      }
    }
  }
}

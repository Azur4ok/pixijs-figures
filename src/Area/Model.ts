import { Figure } from '../figers/Figure'
import { Container } from 'pixi.js'
import { DEFAULT_GRAVITY_VALUE } from '../constants'
import { ShapesPool } from './../ShapesPool/index'

export class Model {
  public figures: Figure[] = []
  public gravity: number = DEFAULT_GRAVITY_VALUE
  public figuresPerSec: number = 5
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

  getNumberOfCurrentShapes(): number {
    return this.figures.length
  }

  getGravityValue() {
    return this.gravity
  }

  increaseGravityValue = () => {
    this.gravity += 1
  }

  increaseFiguresPerSec() {
    this.figuresPerSec += 1
  }

  decreaseFiguresPerSec() {
    this.figuresPerSec -= 1
  }

  decreaseGravityValue = () => {
    this.gravity -= 1
  }

  addGravityButtonsListeners() {
    document
      .getElementById('increase-gravity')
      ?.addEventListener('click', this.increaseGravityValue)
    document
      .getElementById('decrease-gravity')
      ?.addEventListener('click', this.decreaseGravityValue)
  }

  getContainer() {
    return this.container
  }

  update(delta: number) {
    for (let i = 0; i < this.figuresPerSec; i++) {
      if (this.figures.length !== this.figuresPerSec) {
        console.log(this.figures.length)

        this.createShapes(i)
      } else {
        if (this.figures[i].y <= 550) {
          this.figures[i].update(this.gravity, delta)
        } else {
          this.pool.returnShape(this.figures[i])
          delete this.figures[i]
          this.createShapes(i)
        }
      }
    }
  }
}

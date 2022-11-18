import { Figure } from '../figures/Figure'
import { DEFAULT_GRAVITY_VALUE, DEFAULT_FIGURES_PER_SEC_VALUE } from '../constants'
import { ShapesPool } from './../ShapesPool/index'
import { Container } from 'pixi.js'

export class Model {
  public figures: Figure[] = []
  public gravity: number = DEFAULT_GRAVITY_VALUE
  public figuresPerSec: number = DEFAULT_FIGURES_PER_SEC_VALUE
  private pool: ShapesPool

  constructor() {
    this.pool = new ShapesPool()
  }

  createShapes(container: Container) {
    for (let i = this.figures.length; i < this.figuresPerSec; i++) {
      this.figures[i] = this.pool.borrowShape()
      container.addChild(this.figures[i])
    }
  }

  createShape(x: number, y: number, container: Container) {
    const figure = this.pool.borrowShape()
    console.log(figure.x, x)

    figure.x = x
    figure.y = y
    container.addChild(figure)
    this.figures.push(figure)
  }

  removeShape(shape: Figure, index: number) {
    shape.y = -10
    this.pool.returnShape(shape)
    this.figures.splice(index, 1)
    this.figures.forEach((figure, index) => {
      figure.addListener('pointerdown', () => {
        figure.clear()
        this.removeShape(figure, index)
      })
    })
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
}

import { Container } from 'pixi.js'
import { Model } from './Model'

export class Controller {
  private model: Model
  public container: Container

  public counter: number = 0

  public constructor() {
    this.model = new Model()

    this.container = new Container()
  }

  public getFiguresOnArea() {
    return this.model.figures.filter((figure) => figure.y < 390).length
  }

  public getOccupiedArea() {
    let counter: number = 0
    for (let i = 0; i < this.model.figures.length; i++) {
      counter += this.model.figures[i].area
    }
    return counter
  }

  public createRandomShape(x: number, y: number) {
    for (let i = 0; i < this.model.figures.length; i++) {
      if (this.model.figures[i].x / 2 >= x) {
        console.log('here a figure')
      } else {
        this.model.createShape(x, y, this.container)
        break
      }
    }
  }

  public handleIncreaseGravityClick(): number {
    return this.model.increaseGravityValue()
  }

  public handleDecreaseGravityClick(): number {
    return this.model.decreaseGravityValue()
  }

  public handleIncreaseShapesPerSec(): number {
    return this.model.increaseFiguresPerSec()
  }

  public handleDecreaseShapesPerSec(): number {
    return this.model.decreaseFiguresPerSec()
  }

  update(delta: number): void {
    if (this.model.figures.length < this.model.figuresPerSec) {
      this.model.createShapes(this.container)
    } else {
      this.model.figures.forEach((figure, i) => {
        figure.removeAllListeners('pointerdown')
        figure.update(this.model.gravity, delta)

        figure.addListener('pointerdown', () => {
          figure.clear()
          this.container.removeChild(figure)
          this.model.removeShape(figure, i)
        })
      })
    }
    for (let i = 0; i < this.model.figures.length; i++) {
      if (this.model.figures[i].y > 430) {
        this.container.removeChild(this.model.figures[i])
        this.model.removeShape(this.model.figures[i], i)
      }
    }
  }
}

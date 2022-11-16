import { Container } from 'pixi.js'
import { Model } from './Model'

export class Controller {
  private model: Model
  public container: Container

  public constructor() {
    this.model = new Model()

    this.container = this.model.getContainer()
  }

  update(delta: number): void {
    this.model.update(delta)
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
}

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

  getCurrentData() {
    return {
      numberOfCurrentShapes: this.model.getNumberOfCurrentShapes(),
      gravityValue: this.model.getGravityValue(),
    }
  }

  bindGravityButtonsListeners() {
    this.model.addGravityButtonsListeners()
  }
}

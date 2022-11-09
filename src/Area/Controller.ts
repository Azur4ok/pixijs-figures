import { Model } from './Model'

export class Controller {
  model: Model
  public constructor() {
    this.model = new Model()
  }
  update(): void {
    this.model.update()
  }

  bindIncreaseButtonsListener(): void {
    
  }
}

import { Coords, DELTA, EnvMutation, FigureRecord } from '../constants'
import { Model } from './Model'

export class Controller {
  private model: Model

  public constructor() {
    this.model = new Model()
  }

  public clickHandler(name: string): void {
    this.model.setIndexToDestroy(name)
  }

  public handleEnv(data: EnvMutation) {
    return this.model.changeEnv(data)
  }

  createRandomShape(coords: Coords) {
    this.model.setNewRandomShapeCoords(coords)
  }

  update(delta: number): FigureRecord {
    return this.model.update(DELTA)
  }
}

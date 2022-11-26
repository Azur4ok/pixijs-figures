import { Coords, DELTA, EnvMutation, FigureRecord } from '../constants'
import { Model } from './Model'
import { Area } from './View'

export class Controller {
  private model: Model
  private view: Area

  public counter: number = 0

  public constructor(view: Area) {
    this.model = new Model()
    this.view = view
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

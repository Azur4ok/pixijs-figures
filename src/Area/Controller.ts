import { Coords, EnvMutation } from '../constants'
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

  // public getFiguresOnArea() {
  //   return this.model.figures.filter((figure) => figure.y < 600).length
  // }

  // public getOccupiedArea() {
  //   let counter: number = 0
  //   for (let i = 0; i < this.model.figures.length; i++) {
  //     counter += this.model.figures[i].area
  //   }
  //   return counter
  // }

  public handleEnv(data: EnvMutation) {
    return this.model.changeEnv(data)
  }

  createRandomShape(coords: Coords) {
    this.model.setNewRandomShapeCoords(coords)
  }

  update(delta: number): void {
    // for (let i = 0; i < this.model.figures.length; i++) {
    //   if (this.model.figures[i].y > 500) {
    //     this.model.removeShape(this.model.figures[i], i)
    //   }
    // }
  }
}

import { Figure } from './Figure'
import { RADIUS } from './../constants/index'
import { Utils } from './../utils/index'

export class Polygon extends Figure {
  draw(): void {
    const peacks = []
    const center = [0, 0]
    const radius = RADIUS
    const numberOfPoints = Utils.generateRandomInteger(3, 6)
    const theta = Utils.generateRandomInteger(0, 350) / numberOfPoints

    for (let i = 1; i <= numberOfPoints; i++) {
      const x = Math.floor(
        radius * Math.cos((2 * Math.PI * i) / numberOfPoints + theta) + center[0],
      )
      const y = Math.floor(
        radius * Math.sin((2 * Math.PI * i) / numberOfPoints + theta) + center[1],
      )
      peacks.push([x, y])
    }
    const path = peacks.reduce((acc, value) => acc.concat(value), [])

    this.drawPolygon(path)
    this.area = this.calculateArea(peacks)
  }

  public calculateArea(peacks: number[][]): number {
    let area = 0
    for (let i = 0; i < peacks.length; i++) {
      let addX = peacks[i][0]
      let addY = peacks[i == peacks.length - 1 ? 0 : i + 1][1]
      let subX = peacks[i == peacks.length - 1 ? 0 : i + 1][0]
      let subY = peacks[i][1]

      area += addX * addY * 0.5
      area -= subX * subY * 0.5
    }
    return Math.round(Math.abs(area))
  }
}

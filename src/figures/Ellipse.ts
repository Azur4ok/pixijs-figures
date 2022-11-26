import { Figure } from './Figure'
import { ellipseConfig } from '../constants'

export class Ellipse extends Figure {
  private static WIDTH: number = ellipseConfig.WIDTH
  private static HEIGHT: number = ellipseConfig.HEIGHT

  draw(): void {
    this.x = this.x / 2
    this.drawEllipse(this.x, this.y, Ellipse.WIDTH, Ellipse.HEIGHT)
    this.area = this.calculateArea()
  }

  setXCoord(x: number): void {
    this.x = Math.floor(x / 2)
  }
  setYCoord(y: number): void {
    this.y = y
  }
  calculateArea(): number {
    return Math.round(Math.PI * Ellipse.WIDTH * Ellipse.HEIGHT)
  }
}

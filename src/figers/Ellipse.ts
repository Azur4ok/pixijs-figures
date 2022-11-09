import { Figure } from './Figure'

export class Ellipse extends Figure {
  private static WIDTH: number = 30
  private static HEIGHT: number = 25
  draw(): void {
    this.drawEllipse(this.x, this.y, Ellipse.WIDTH, Ellipse.HEIGHT)
    this.area = this.calculateArea()
  }
  calculateArea(): number {
    return Math.round(Math.PI * Ellipse.WIDTH * Ellipse.HEIGHT)
  }
}

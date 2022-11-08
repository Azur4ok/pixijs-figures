import { Figure } from './Figure'

export class Ellipse extends Figure {
  static width: number = 30
  static height: number = 25
  draw(): void {
    this.drawEllipse(this.x, this.y, this.width, this.height)
    this.area = this.calculateArea()
  }
  calculateArea(): number {
    return Math.round(Math.PI * this.width * this.height)
  }
}

import { Figure } from './Figure'

export class Circle extends Figure {
  private radius: number = 15

  draw(): void {
    this.drawCircle(this.x, this.y, this.radius)
    this.area = this.calculateArea()
  }

  calculateArea() {
    return Math.round(Math.PI * Math.pow(this.radius, 2))
  }
}

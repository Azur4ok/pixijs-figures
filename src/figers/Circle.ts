import { Figure } from './Figure'

export class Circle extends Figure {
  private static radius: number = 20

  draw(): void {
    this.drawCircle(this.x, this.y, Circle.radius)
    this.area = this.calculateArea()
  }

  calculateArea() {
    return Math.round(Math.PI * Math.pow(Circle.radius, 2))
  }
}

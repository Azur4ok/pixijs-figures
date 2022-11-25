import { Figure } from './Figure'
import { RADIUS } from '../constants/index'

export class Circle extends Figure {
  private static radius: number = RADIUS

  draw(): void {
    this.x = Math.round(this.x / 2)
    this.drawCircle(this.x, this.y, Circle.radius)
    this.area = this.calculateArea()
  }

  setXCoord(x: number): void {
    this.x = Math.floor(x / 2)
  }

  setYCoord(y: number): void {
    this.y = y
  }

  calculateArea() {
    return Math.round(Math.PI * Math.pow(Circle.radius, 2))
  }
}

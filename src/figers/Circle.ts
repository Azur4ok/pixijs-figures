import { Figure } from './Figure'
import { RADIUS } from './../constants/index';

export class Circle extends Figure {
  private static radius: number = RADIUS

  draw(): void {
    this.drawCircle(this.x, this.y, Circle.radius)
    this.area = this.calculateArea()
  }

  calculateArea() {
    return Math.round(Math.PI * Math.pow(Circle.radius, 2))
  }
}

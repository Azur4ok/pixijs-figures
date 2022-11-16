import { Circle, Ellipse, Figure, Polygon } from '../figures'
import { Utils } from './../utils/index'

export class ShapesPool {
  private shapes: Figure[] = []

  public constructor() {
    this.createShapes()
  }

  public borrowShape = () => this.shapes.shift()!

  public returnShape(shape: Figure) {
    this.shapes.push(shape)
  }

  private addShapes(amount: number, type: string) {
    for (let i = 0; i < amount; i++) {
      switch (type) {
        case 'ellipse':
          const ellipse = new Ellipse(
            Utils.generateRandomInteger(40, 250),
            -10,
            Utils.randomColor(),
          )
          this.shapes.push(ellipse)
          break
        case 'circle':
          const circle = new Circle(Utils.generateRandomInteger(40, 250), -10, Utils.randomColor())
          this.shapes.push(circle)
          break
        case 'polygon':
          const polygon = new Polygon(
            Utils.generateRandomInteger(40, 380),
            -10,
            Utils.randomColor(),
          )
          this.shapes.push(polygon)
          break
      }
    }
  }

  private createShapes() {
    this.shapes = []

    this.addShapes(100, 'polygon')
    this.addShapes(100, 'ellipse')
    this.addShapes(100, 'circle')

    this.shuffle(this.shapes)
  }

  private shuffle(array: Figure[]) {
    const length = array.length
    const shuffles = length * 3
    for (let i = 0; i < shuffles; i++) {
      const poolSlice = array.pop()
      const position = Math.floor(Math.random() * (length - 1))
      array.splice(position, 0, poolSlice!)
    }
  }
}

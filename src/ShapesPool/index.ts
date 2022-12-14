import { Shape, ShapeInitialData } from '../constants'
import { Circle, Ellipse, Figure, Polygon } from '../figures'
import { Utils } from './../utils/index'


export class ShapesPool {
  private shapes: Figure[] = []

  public constructor() {
    this.createShapes()
  }

  public borrowShape = () => this.shapes.shift()!

  public returnShape(shape: Figure) {
    return this.shapes.push(shape)
  }

  private clearShapes = () => (this.shapes = [])

  private generateShapeByConstructor = (
    AbstractShape: Shape,
    shapeInitialData: ShapeInitialData,
  ) => {
    const shapeImplementation = new AbstractShape(
      Utils.generateRandomInteger(shapeInitialData.size[0], shapeInitialData.size[1]),
      shapeInitialData.y,
      Utils.randomColor(),
    )

     this.shapes.push(shapeImplementation)
  }

  private addShapes(amount: number, type: string) {
    switch (type) {
      case 'ellipse':
        for (let position = 0; position < amount; position++) {
          this.generateShapeByConstructor(Ellipse as unknown as Shape, { size: [40, 760], y: -50 })
        }
        break
      case 'circle':
        for (let position = 0; position < amount; position++) {
          this.generateShapeByConstructor(Circle as unknown as Shape, { size: [40, 770], y: -50 })
        }
        break
      case 'polygon':
        for (let position = 0; position < amount; position++) {
          this.generateShapeByConstructor(Polygon as unknown as Shape, { size: [30, 780], y: -50 })
        }
        break
    }
  }

  private createShapes() {
    this.clearShapes()

    this.addShapes(100, 'polygon')
    this.addShapes(100, 'ellipse')
    this.addShapes(100, 'circle')

    this.shuffle()
  }

  private shuffle() {
    const shapes = this.shapes
    const length = shapes.length
    const shuffles = length * 3
    for (let i = 0; i < shuffles; i++) {
      const poolSlice = shapes.pop()
      const position = Math.floor(Math.random() * (length - 1))
      shapes.splice(position, 0, poolSlice!)
    }
  }
}

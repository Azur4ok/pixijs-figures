import { Figure } from '../figers/Figure'
import { Container, Graphics } from 'pixi.js'
import { Ellipse } from '../figers/Ellipse'
import { Circle } from '../figers/Circle'
import { Utils } from '../utils'
import { DEFAULT_GRAVITY_VALUE } from '../constants'
import { Polygon } from './../figers/Polygon'

export class Model {
  private figures: Figure[] = []
  private gravity: number = DEFAULT_GRAVITY_VALUE
  ellipse!: Ellipse
  circle!: Circle
  container: Container
  figure: Graphics = new Graphics()
  polygon!: Polygon

  constructor() {
    this.container = new Container()
    this.drawFigure()
  }

  getNumberOfCurrentShapes(): number {
    return this.figures.length
  }

  getGravityValue() {
    return this.gravity
  }

  increaseGravityValue = () => {
    this.gravity += 1
  }

  decreaseGravityValue = () => {
    this.gravity -= 1
  }

  addGravityButtonsListeners() {
    document
      .getElementById('increase-gravity')
      ?.addEventListener('click', this.increaseGravityValue)
    document
      .getElementById('decrease-gravity')
      ?.addEventListener('click', this.decreaseGravityValue)
  }

  getContainer() {
    return this.container
  }

  drawFigure() {
    this.figure = new Graphics()
    this.ellipse = new Ellipse(50, -10, parseInt(Utils.randomColor(), 16))
    this.circle = new Circle(150, -10, parseInt(Utils.randomColor(), 16))
    this.polygon = new Polygon(200, -10, parseInt(Utils.randomColor(), 16))
    this.container.addChild(this.ellipse)
    this.container.addChild(this.circle)
    this.container.addChild(this.polygon)
  }

  update(delta: number) {
    this.ellipse.update(this.gravity, delta)
    this.circle.update(this.gravity, delta)
    this.polygon.update(this.gravity, delta)
    if (this.ellipse.y > 500 && this.circle.y > 500) {
      this.ellipse = new Ellipse(50, -10, parseInt(Utils.randomColor(), 16))
      this.circle = new Circle(150, -10, parseInt(Utils.randomColor(), 16))
      this.polygon = new Polygon(200, -10, parseInt(Utils.randomColor(), 16))
      this.container.addChild(this.ellipse)
      this.container.addChild(this.circle)
      this.container.addChild(this.polygon)
    }
    if (this.ellipse.y <= -50 && this.circle.y <= -50) {
      this.ellipse = new Ellipse(50, 440, parseInt(Utils.randomColor(), 16))
      this.circle = new Circle(100, 440, parseInt(Utils.randomColor(), 16))
      this.polygon = new Polygon(200, 440, parseInt(Utils.randomColor(), 16))
      this.container.addChild(this.ellipse)
      this.container.addChild(this.circle)
      this.container.addChild(this.polygon)
    }
  }
}

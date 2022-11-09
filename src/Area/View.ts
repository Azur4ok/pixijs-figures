import { Application, Container } from 'pixi.js'
import { Utils } from '../utils'
import { Ellipse } from './../figers/Ellipse'
import { Circle } from './../figers/Circle'
import { Controller } from './Controller'

export class Area {
  private app: Application
  ellipse!: Ellipse
  circle!: Circle
  container!: any
  private controller: Controller

  constructor(app: Application) {
    this.app = app
    this.controller = new Controller()
    this.drawFigure()
  }

  addAllListeners(): void {
    this.controller.bindIncreaseButtonsListener()
  }

  drawFigure() {
    this.container = new Container()
    this.ellipse = new Ellipse(15, -10, parseInt(Utils.randomColor(), 16))
    this.circle = new Circle(100, -10, parseInt(Utils.randomColor(), 16))
    this.container.addChild(this.ellipse)
    this.container.addChild(this.circle)
    this.app.stage.addChild(this.container)
  }

  update(gravity: number, delta: number) {
    this.ellipse.update(gravity, delta)
    this.circle.update(gravity, delta)
    if (this.ellipse.y > 500 && this.circle.y > 500) {
      this.ellipse.y = -10
      this.circle.y = -10
    }
  }
}

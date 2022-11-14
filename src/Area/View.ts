import { Application } from 'pixi.js'
import { Utils } from '../utils'
import { Ellipse } from './../figers/Ellipse'
import { Circle } from './../figers/Circle'
import { Controller } from './Controller'

export class Area {
  private app: Application
  private numberOfCurrentShapes: string | null | undefined
  private numberOfOccupiedArea: string | null | undefined
  private numberOfShapesPerSec!: string | null | undefined
  private gravityValue: string | null | undefined
  private controller: Controller

  constructor(app: Application) {
    this.app = app

    this.numberOfCurrentShapes = document.getElementById('current-shapes')!.textContent
    this.numberOfOccupiedArea = document.getElementById('occupied-area')!.textContent
    this.numberOfShapesPerSec = document.getElementById('shapes-per-sec')!.textContent
    this.gravityValue = document.getElementById('gravity-value')!.textContent

    this.controller = new Controller()
    this.setCurentData()
    this.addAllListeners()
    this.app.stage.addChild(this.controller.container)
  }

  addAllListeners(): void {
    this.controller.bindGravityButtonsListeners()
  }

  setCurentData() {
    const data = this.controller.getCurrentData()

    document.getElementById('gravity-value')!.textContent = `${this.gravityValue} ${String(
      data.gravityValue,
    )}`
  }

  update(delta: number) {
    this.setCurentData()
    this.controller.update(delta)
  }
}

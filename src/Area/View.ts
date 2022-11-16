import { Application } from 'pixi.js'

import { DEFAULT_FIGURES_PER_SEC_VALUE, DEFAULT_GRAVITY_VALUE } from '../constants'
import { Controller } from './Controller'

export class Area {
  private app: Application
  private controller: Controller

  public gravityValue: HTMLElement
  public numberOfCurrentShapes: HTMLElement
  public numberOfOccupiedArea: HTMLElement
  public numberOfShapesPerSec: HTMLElement

  public increaseGravityButton: HTMLElement
  public decreaseGravityButton: HTMLElement
  public increaseFiguresPerSecButton: HTMLElement
  public decreaseFiguresPerSecButton: HTMLElement

  constructor(app: Application) {
    this.app = app

    this.numberOfCurrentShapes = document.getElementById('current-shapes')!
    this.numberOfOccupiedArea = document.getElementById('occupied-area')!
    this.numberOfShapesPerSec = document.getElementById('shapes-per-sec')!
    this.gravityValue = document.getElementById('gravity-value')!

    this.gravityValue.textContent = `Gravity value: ${DEFAULT_GRAVITY_VALUE}`
    this.numberOfShapesPerSec.textContent = `Number of shapes per sec: ${DEFAULT_FIGURES_PER_SEC_VALUE}`

    this.increaseGravityButton = document.getElementById('increase-gravity')!
    this.decreaseGravityButton = document.getElementById('decrease-gravity')!
    this.increaseFiguresPerSecButton = document.getElementById('increase-figures-per-sec')!
    this.decreaseFiguresPerSecButton = document.getElementById('decrease-figures-per-sec')!

    this.controller = new Controller()

    this.bindEventListeners()
    this.app.stage.addChild(this.controller.container)
  }

  private onIncreaseGravityClick() {
    this.updateGravityTitle(this.controller.handleIncreaseGravityClick())
  }

  private onDecreaseGravityClick() {
    this.updateGravityTitle(this.controller.handleDecreaseGravityClick())
  }

  private onIncreaseFiguresPerSec() {
    this.updateFiguresPerSecTitle(this.controller.handleIncreaseShapesPerSec())
  }

  private onDecreaseFiguresPerSec() {
    this.updateFiguresPerSecTitle(this.controller.handleDecreaseShapesPerSec())
  }
  updateFiguresPerSecTitle(value: number) {
    this.numberOfShapesPerSec.textContent = `Number of shapes per sec: ${value}`
  }

  private updateGravityTitle(value: number) {
    this.gravityValue.textContent = `Gravity value: ${value}`
  }

  private bindEventListeners() {
    this.increaseGravityButton.addEventListener('click', () => {
      this.onIncreaseGravityClick()
    })
    this.decreaseGravityButton.addEventListener('click', () => {
      this.onDecreaseGravityClick()
    })
    this.decreaseFiguresPerSecButton.addEventListener('click', () => {
      this.onDecreaseFiguresPerSec()
    })
    this.increaseFiguresPerSecButton.addEventListener('click', () => {
      this.onIncreaseFiguresPerSec()
    })
  }

  update(delta: number) {
    this.controller.update(delta)
  }
}

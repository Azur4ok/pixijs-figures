import { Application, Container, FederatedPointerEvent, Graphics } from 'pixi.js'

import { DEFAULT_FIGURES_PER_SEC_VALUE, DEFAULT_GRAVITY_VALUE } from '../constants'
import { Controller } from './Controller'

export class Area {
  public app: Application
  private width: number
  private height: number
  private controller: Controller

  public gravityValue: HTMLElement
  public numberOfCurrentShapes: HTMLElement
  public numberOfOccupiedArea: HTMLElement
  public numberOfShapesPerSec: HTMLElement

  public increaseGravityButton: HTMLElement
  public decreaseGravityButton: HTMLElement
  public increaseFiguresPerSecButton: HTMLElement
  public decreaseFiguresPerSecButton: HTMLElement

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
    })

    document.getElementById('canvas')?.appendChild(this.app.view as HTMLCanvasElement)

    this.controller = new Controller(this)

    this.gravityValue = document.getElementById('gravity-value')!
    this.numberOfCurrentShapes = document.getElementById('current-shapes')!
    this.numberOfOccupiedArea = document.getElementById('occupied-area')!
    this.numberOfShapesPerSec = document.getElementById('shapes-per-sec')!

    this.gravityValue.textContent = `Gravity value: ${DEFAULT_GRAVITY_VALUE}`
    this.numberOfShapesPerSec.textContent = `Number of shapes per sec: ${DEFAULT_FIGURES_PER_SEC_VALUE}`

    this.increaseGravityButton = document.getElementById('increase-gravity')!
    this.decreaseGravityButton = document.getElementById('decrease-gravity')!
    this.increaseFiguresPerSecButton = document.getElementById('increase-figures-per-sec')!
    this.decreaseFiguresPerSecButton = document.getElementById('decrease-figures-per-sec')!

    this.app.stage.addChild(this.createBackground())

    this.bindEventListeners()
  }

  init(): void {
    this.app.ticker.add(this.update, this)
  }

  createBackground(): Graphics {
    const background = new Graphics()
    background.beginFill(0x808080)
    background.drawRect(0, 0, this.width, this.height)
    background.endFill()

    background.interactive = true
    background.cursor = 'pointer'
    background.addListener('pointerdown', (event: FederatedPointerEvent) => {
      const { x, y } = background.toLocal(event.global)
      this.controller.createRandomShape({ x: Math.round(x), y: Math.round(y) })
    })
    return background
  }

  // private updateFiguresOnArea() {
  //   this.numberOfCurrentShapes.textContent = ` ${this.controller.getFiguresOnArea()}`
  // }

  // private updateOccupiedArea() {
  //   this.numberOfOccupiedArea.textContent = ` ${this.controller.getOccupiedArea()}`
  // }

  private updateFiguresPerSecTitle(value: number) {
    this.numberOfShapesPerSec.textContent = `Number of shapes per sec: ${value}`
  }

  private updateGravityTitle(value: number) {
    this.gravityValue.textContent = `Gravity value: ${value}`
  }

  private onIncreaseGravityClick() {
    this.updateGravityTitle(
      this.controller.handleEnv({
        subject: 'gravity',
        operation: 'add',
        value: 1,
      }),
    )
  }

  private onDecreaseGravityClick() {
    this.updateGravityTitle(
      this.controller.handleEnv({
        subject: 'gravity',
        operation: 'subtract',
        value: 1,
      }),
    )
  }

  private onIncreaseFiguresPerSec() {
    this.updateFiguresPerSecTitle(
      this.controller.handleEnv({
        subject: 'figuresPerSec',
        operation: 'add',
        value: 1,
      }),
    )
  }

  private onDecreaseFiguresPerSec() {
    this.updateFiguresPerSecTitle(
      this.controller.handleEnv({
        subject: 'figuresPerSec',
        operation: 'subtract',
        value: 1,
      }),
    )
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
    // this.updateOccupiedArea()
    // this.updateFiguresOnArea()
    this.controller.update(delta)
  }
}

import { Application, FederatedPointerEvent, Graphics } from 'pixi.js'

import {
  DEFAULT_FIGURES_PER_SEC_VALUE,
  DEFAULT_GRAVITY_VALUE,
  FigureObject,
  ShapeRecord,
} from '../constants'
import { Controller } from './Controller'

export class Area {
  public app: Application
  private controller: Controller
  private width: number
  private height: number
  private totalArea: number = 0
  private figuresOnArea: number = 0
  private shapes: ShapeRecord = {}

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

    this.controller = new Controller()

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
    this.app.ticker.add(this.updateView, this)
  }

  private createBackground(): Graphics {
    const background = new Graphics()
    background.beginFill(0x808080)
    background.drawRect(0, 0, this.width, this.height)
    background.endFill()

    background.interactive = true
    background.cursor = 'pointer'
    background.addListener('pointerdown', (event: FederatedPointerEvent) => {
      const { x, y } = background.toLocal(event.global)
      this.controller.createRandomShape({ x: Math.floor(x), y: Math.floor(y) })
    })
    return background
  }

  private createElement(element: FigureObject) {
    const figure = element.figure
    figure.interactive = true
    figure.cursor = 'pointer'
    figure.name = element.name
    figure.addListener('pointerdown', () => {
      this.controller.clickHandler(element.name)
    })
    this.shapes[element.name] = figure
    this.app.stage.addChild(figure)

    if (figure.area) {
      this.totalArea += figure.area
    }
  }

  private updateFiguresOnArea(value: number): void {
    this.numberOfCurrentShapes.textContent = ` ${value}`
  }

  private updateOccupiedArea(value: number): void {
    this.numberOfOccupiedArea.textContent = ` ${value}`
  }

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

  private updateView(delta: number): void {
    const figures = this.controller.update(delta)

    for (const name in figures) {
      if (!this.shapes[name]) {
        this.createElement(figures[name])
      }
    }

    for (const name in this.shapes) {
      if (figures[name]) {
        this.shapes[name].y = figures[name].velocityY

        if (this.shapes[name].y + this.shapes[name].height > 10) {
          this.figuresOnArea += 1
        }
      } else {
        this.app.stage.removeChild(this.shapes[name])
        this.totalArea -= this.shapes[name].area
        delete this.shapes[name]
      }
    }
    this.updateFiguresOnArea(this.figuresOnArea)
    this.updateOccupiedArea(this.totalArea)
    this.figuresOnArea = 0
  }
}

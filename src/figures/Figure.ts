import { Graphics } from 'pixi.js'

export abstract class Figure extends Graphics {
  public color: number
  public area: number = 0

  public constructor(x: number, y: number, color: number) {
    super()

    this.interactive = true
    this.cursor = 'pointer'
    this.x = x
    this.y = y
    this.color = color

    this.beginFill(this.color)
    this.draw()
    this.endFill()
  }

  bindListener(handler: () => void) {
    this.addListener('pointerdown', handler)
  }

  abstract draw(): void

  update(gravity: number, delta: number) {
    this.y += gravity * delta
  }
}

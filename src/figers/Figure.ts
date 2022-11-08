import { Graphics } from 'pixi.js'
import { Utils } from './../utils/index'

export abstract class Figure extends Graphics {
  public color: number
  public area: number = 0
  
  public constructor(x: number, y: number, color: number) {
    super()

    this.interactive = true

    this.x = x
    this.y = y
    this.color = color

    this.beginFill(this.color)
    this.draw()
    this.endFill()
  }

  abstract draw(): void
  abstract calculateArea(): number

  bindEventListener() {
    this.addListener('pointerdown', () => this.clear())
  }

  update(gravity: number, delta: number) {
    this.y += gravity * delta
  }
}

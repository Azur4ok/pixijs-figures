import { Application } from 'pixi.js'

import { Area } from './Area/View'
import { canvasConfig } from './constants'

const app = new Application({
  width: canvasConfig.width,
  height: canvasConfig.height,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  view: document.getElementById('canvas') as HTMLCanvasElement,
})

app.stage.interactive = true
app.stage.cursor = 'pointer'

function setup(): void {
  const area = new Area(app)

  app.ticker.add((delta: number) => {
    area.update(delta)
  })
}

window.onload = setup

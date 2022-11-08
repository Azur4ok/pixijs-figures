import { Application } from 'pixi.js'
import { Area } from './Area/View'

import { canvasConfig } from './constants'

const app = new Application({
  width: canvasConfig.width,
  height: canvasConfig.height,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: '#ededed',
  view: document.getElementById('canvas') as HTMLCanvasElement,
})

function setup(): void {
  const area = new Area(app)
}

window.onload = setup

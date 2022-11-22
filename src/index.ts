import { Area } from './Area/View'

function setup(): void {
  const area = new Area(800, 600)
  area.init()
}

window.onload = setup

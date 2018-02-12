var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var paper = require('paper')
var xtend = require('xtend')

module.exports = class Moire extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      unit: [0, 0, 0],
      color: '#fafafa',
      gridSize: 50,
      spacing: 3,
      bounds: 10,
    }

    this.resize = this.resize.bind(this)
  }

  load (element) {
    // initialize
    paper.setup(element)

    // some state
    this.state.bounds = Math.max(window.innerHeight, window.innerWidth) * 1.25 / this.state.gridSize

    // create our groups
    this.group1 = this.createGroup()
    this.group2 = this.createGroup()
    this.screen = new paper.Path.Rectangle(this.getScreenProps())

    // setup
    this.group1.rotate(Math.random() * 360, paper.view.center)

    // init
    this.resize()
    paper.view.onResize = this.resize
  }

  createGroup () {
    var group = new paper.Group() 
    group.transformContent = false

    for (var y = 0; y < this.state.bounds; y++) {
      for (var x = 0; x < this.state.bounds; x++) {
        var path = new paper.Path.Circle({
          radius: this.state.gridSize / 2 / this.state.spacing * ((Math.random() * 0.5) + 0.5),
          fillColor: this.state.color,
          center: new paper.Point(x * this.state.gridSize, y * this.state.gridSize)
        })
        group.insertChild(0, path)
      }
    }

    return group
  }

  createElement (props) {
    return html`<canvas resize></canvas>`
  }

  resize (event) {
    this.screen.set(this.getScreenProps())
    this.group1.position = paper.view.center
    this.group2.position = paper.view.center
    this.screen.position = paper.view.center
    paper.view.draw()
  }

  refresh (props) {
    this.state = xtend(this.state, props)
    if (paper.project) {
      this.group1.rotate(Math.abs(props.unit[1]) * 0.25, paper.view.center)
      this.group2.rotate(Math.abs(props.unit[2]) * 0.25 * -1, paper.view.center)
    }
  }

  getScreenProps () {
    return {
      topLeft: [0, 0],
      bottomRight: [paper.view.size.width, paper.view.size.height],
      fillColor: {
        gradient: {
          stops: [
            new paper.Color(255, 255, 255, 0),
            new paper.Color(255, 255, 255, 0),
            new paper.Color(255, 255, 255, 1)
          ]
        },
        origin: [0, 0],
        destination: [0, paper.view.size.height]
      }
    }
  }

  update (props) {
    this.refresh(props)
    return false
  }
}
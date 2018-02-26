var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var paper = require('paper')
var xtend = require('xtend')

module.exports = class Moire extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      unit: [0, 0, 0],
      color: '#e5e5e5',
      gridSize: 80,
      spacing: 1.1,
      bounds: 10
    }

    this.resize = this.resize.bind(this)
  }

  load (element) {
    var winMax = Math.max(window.innerHeight, window.innerWidth)

    // initialize
    paper.setup(element)

    this.state = xtend(this.state, {
      gridSize: winMax * 0.1,
      spacing: 1.1,
      bounds: 10
    })

    // some state
    this.state.bounds = winMax * 1.25 / this.state.gridSize

    // create our groups
    this.group1 = this.createGroup()
    this.group2 = this.createGroup()
    // this.fade = new paper.Path.Rectangle(this.getFadeProps())

    // setup
    this.group1.rotate(32, paper.view.center)

    // init
    this.resize()
    paper.view.onResize = this.resize
  }

  createGroup () {
    var group = new paper.Group() 
    group.transformContent = false

    // build up our matrix of circles
    for (var y = 0; y < this.state.bounds; y++) {
      for (var x = 0; x < this.state.bounds; x++) {
        // define our shape
        var path = new paper.Path.Circle({
          radius: this.state.gridSize / 2 / this.state.spacing,
          fillColor: this.state.color,
          center: new paper.Point(x * this.state.gridSize, y * this.state.gridSize)
        })
        // add it to the group
        group.insertChild(0, path)
      }
    }

    return group
  }

  createElement (props) {
    return html`<canvas resize></canvas>`
  }

  resize (event) {
    if (this.screen) this.screen.remove()
    // this.screen = this.createScreen()
    this.group1.position = paper.view.center
    this.group2.position = paper.view.center
    // this.screen.position = paper.view.center
    // this.fade.position = paper.view.center
    paper.view.draw()
  }

  refresh (props) {
    this.state.unit = props.unit

    if (paper.project) {
      this.group1.rotate((1 - Math.abs(props.unit[1])) * 0.1, paper.view.center)
      this.group2.rotate((1 - Math.abs(props.unit[2])) * 0.1 * -1, paper.view.center)

      // if (this.fade.opacity > 0.01 && this.fade.visible) {
      //   this.fade.opacity -= 0.01
      // } else if (this.fade.visible) {
      //   this.fade.opacity = 0
      //   this.fade.visible = false
      //   this.fade.remove()
      // }
    }
  }

  // getFadeProps () {
  //   return {
  //     topLeft: [0, 0],
  //     bottomRight: paper.view.size,
  //     fillColor: '#1a1a1a'
  //   }
  // }

  createScreen () {
    var min = Math.min(paper.view.size.width, paper.view.size.height)
    return new paper.Path.Rectangle({
      topLeft: [0, 0],
      bottomRight: paper.view.size,
      fillColor: {
        gradient: {
          radial: true,
          stops: [
            new paper.Color(255, 255, 255, 0),
            new paper.Color(255, 255, 255, 0),
            new paper.Color(255, 255, 255, 1)
          ]
        },
        origin:  [paper.view.size.width / 2, paper.view.size.height / 2],
        destination: [min, min]
      }
    })
  }

  update (props) {
    this.refresh(props)
    return false
  }
}

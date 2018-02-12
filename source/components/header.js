var Nanocomponent = require('nanocomponent')
var Moire = require('./moire')
var raw = require('choo/html/raw')
var html = require('choo/html')

var moire = new Moire()

module.exports = class Header extends Nanocomponent {
  constructor () {
    super()

    this.observer
    this.frame
    this.state = {
      title: '',
      target: [1, 0, -0.5],
      unit: [1, 0, -0.5],
      img: {
        loaded: false,
        src: '/assets/ui.svg'
      }
    }

    this.handleIntersection = this.handleIntersection.bind(this)
    this.createFrame = this.createFrame.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  load (element) {
    var self = this

    // track position
    this.observer = new IntersectionObserver(this.handleIntersection)
    this.observer.observe(element)

    // load image
    var img = new Image()
    img.addEventListener('load', handleLoad)
    img.setAttribute('src', this.state.img.src)

    function handleLoad () {
      self.state.img.loaded = true
      self.rerender()
    }
  }

  unload (element) {
    if (this.observerver) this.observer.disconnect()
  }

  createElement (props) {
    this.state = Object.assign(this.state, props)

    return html`
      <header
        style="
          --unit: ${this.state.unit[0]};
          --unitx: ${this.state.unit[1]};
          --unity: ${this.state.unit[2]};
        "
      >
        ${moire.render({
          unit: this.state.unit
        })}
        <div class="masthead fadein">
          <h1>${this.state.title}</h1>
          <h2>${raw(breakText(this.state.subtitle))}</h2>
        </div>
        <div class="screenshot ${this.state.img.loaded ? 'fadein' : ''}">
          ${this.state.img.loaded ? html`<img src="${this.state.img.src}">` : ''}
        </div>
      </header>
    `
  }

  update (props) {
    return false
  }

  createFrame () {
    var diff = this.state.target[0] - this.state.unit[0]
    var diffx = this.state.target[1] - this.state.unit[1]
    var diffy = this.state.target[2] - this.state.unit[2]
    this.state.unit[0] += diff * 0.025
    this.state.unit[1] += (diffx * 0.025) / 2
    this.state.unit[2] += (diffy * 0.025) / 2
    this.element.style.setProperty('--unit', this.state.unit[0])
    this.element.style.setProperty('--unitx', this.state.unit[1])
    this.element.style.setProperty('--unity', this.state.unit[2])
    moire.refresh({ unit: this.state.unit })
    this.frame = window.requestAnimationFrame(this.createFrame)
  }

  handleMove (event) {
    var width = window.innerWidth / 2
    var height = window.innerHeight * 0.95
    var x = (event.clientX - width) / width
    var y = (event.clientY - height) / height
    var unit = [Math.sqrt(x * x + y * y), x, y]
    this.state.target = unit
  }

  handleIntersection (event) {
    if (event[0].isIntersecting) {
      this.createFrame()
      window.addEventListener('mousemove', this.handleMove, false)
    } else {
      window.cancelAnimationFrame(this.frame)
      window.removeEventListener('mousemove', this.handleMove, false)
    }
  }
}

function breakText (str) {
  str = str || ''
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
}

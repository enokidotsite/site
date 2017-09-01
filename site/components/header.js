var html = require('choo/html')
var objectValues = require('object-values')
var path = require('path')
var raf = require('raf')
var Nanocomponent = require('nanocomponent')

module.exports = class Header extends Nanocomponent {
  constructor () {
    super()
    this.active = false
    this.position = 0
  }

  createElement (props) {
    props = props || { }
    return html`
      <div>
        <div class="c12 usn psf t0 l0 r0 z3 lh1 site-header" sm="psr">
          <div class="x xw wcontent p1 psr bheader bgwhite">
            ${title(props)}
            ${navigation(props)}
          </div>
        </div>
      </div>
    `
  }

  update (props) {
    var update = props.active !== this.active
    this.active = props.active
    return update
  }

  load () {
    var self = this
    if (typeof window !== 'undefined') {
      this.frames = raf(function tick() {
        if (self.position !== window.scrollY) {
          var lastPos = self.position
          var lastActive = self.active
          self.position = window.scrollY
          self.active = lastPos > self.position
          if (self.active || self.position < 100) {
            self.element.querySelector('.site-header').classList.remove('hidden')
          } else {
            self.element.querySelector('.site-header').classList.add('hidden')
          }
        }
        raf(tick)
      })
    }
  }

  unload () {
    raf.cancel(this.frames)
  }
}

function title (state, emit) {
  return html` 
    <div class="x c6" sm="c12">
      <div class="p1">
        <a href="/" class="nbb tcblack ttu mr1" sm="fs2">${state.title}</a>
        <span class="sup ttu ffmono">(pre-alpha)</span>
      </div>
    </div>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  var display = state.display === true
  var order = state.order || [ ]
  var links = state.links || { }

  // hide if hidden
  if (!display) return ''

  return html`
    <div class="x c6 ttu" sm="c12">
      ${order.map(key => link(links[key]))}
    </div>
  `

  function link (link) {
    var activeClass = link.dirname
      ? isActive(link.dirname) ? 'nav-active' : ''
      : ''
    return html`
      <a
        href="${link.url}"
        class="c4 p1 ${activeClass}"
      >${link.title || link.dirname}</a>
    `
  }

  function isActive (pathLink) {
    return active
      .split(path.sep)
      .filter(str => str)[0] ===
      path.basename(pathLink)
  }
}
var html = require('choo/html')
var ov = require('object-values')
var path = require('path')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main class="x xdc c12 vhmn100">
        <div class="c12 p1">
          <div class="x">
            ${title(state.content)}
            ${navigation({
              active: state.page ? state.page.path : '',
              links: state.content ? state.content.children : { }
            })}
          </div>
        </div>
        <div class="c12 x1">
          ${view(state, emit)}
        </div>
        ${footer(state, emit)}
      </main>
    `
  }
}

function title (state, emit) {
  return html` 
    <div class="c6 p1 ttu">
      <a href="/" class="nbb">${state.title}</a>
    </div>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  var links = ov(state.links) || [ ]

  return html`
    <div class="x xjc c6">
      ${links.map(link)}
    </div>
  `

  function link (link) {
    var activeClass = isActive(link.dirname) ? 'tcgrey' : ''
    return html`
      <div class="p0-5 xx ${activeClass}">
        <a href="${link.url}">${link.title || link.dirname}</a>
      </div>
    `
  }

  function isActive (pathLink) {
    return active
      .split(path.sep)
      .filter(str => str)[0] ===
      path.basename(pathLink)
  }
}

function footer (state, emit) {
  return html`
    <div class="c12 p2 tcgrey bggreylight">
      <div class="c12 x xjb">
        <div class="ttu">
          Enoki
        </div>
        <div>
          <a href="#">Back to Top</a>
        </div>
      </div>
    </div>
  `
}

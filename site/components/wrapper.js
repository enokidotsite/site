var html = require('choo/html')
var objectValues = require('object-values')
var path = require('path')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main class="x xdc c12 vhmn100">
        <div class="c12 p1 usn">
          <div class="x xw">
            ${title(state.content)}
            ${navigation({
              order: state.content.order ? state.content.order : [ ],
              active: state.page ? state.page.path : '',
              links: state.content ? state.content.children : { }
            })}
          </div>
        </div>
        <div class="c12 x1 x xdc">
          ${view(state, emit)}
        </div>
        ${footer(state, emit)}
      </main>
    `
  }
}

function title (state, emit) {
  return html` 
    <div class="c6 p1" sm="c12">
      <a href="/" class="nbb tcblack ttu">${state.title}</a> <span class="tcgrey">(pre-alpha)</span>
    </div>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  var order = state.order || [ ]
  var links = state.links || { }

  return html`
    <div class="x c6" sm="c12">
      ${order.map(key => link(links[key]))}
    </div>
  `

  function link (link) {
    var activeClass = isActive(link.dirname) ? 'tcgrey' : ''
    return html`
      <div class="p1 c4 ${activeClass}">
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
    <div class="c12 p2 tcgrey">
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

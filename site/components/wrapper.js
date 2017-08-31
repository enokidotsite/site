var html = require('choo/html')
var objectValues = require('object-values')
var path = require('path')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main class="x xdc c12 vhmn100 ptheader wcontent" sm="pt0">
        <div class="c12 usn psf t0 l0 r0 z3 bgwhite lh1" sm="psr">
          <div class="x xw wcontent p1 psr bheader">
            ${title(state.content)}
            ${navigation({
              display: state.content.navigation !== false,
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
    <div class="x c6" sm="c12">
      <div class="p1">
        <a href="/" class="nbb tcblack ttu mr1">${state.title}</a>
        <span class="tcgrey">(pre-alpha)</span>
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
    <div class="x c6" sm="c12">
      ${order.map(key => link(links[key]))}
      ${link({ title: 'Github', url: 'https://github.com/jondashkyle/enoki' })}
    </div>
  `

  function link (link) {
    var activeClass = link.dirname
      ? isActive(link.dirname) ? 'nav-active' : ''
      : ''
    return html`
      <div class="p1 c4">
        <div class="${activeClass}">
          <a href="${link.url}">${link.title || link.dirname}</a>
        </div>
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
    <div class="c12 tcgrey lh1 bgwhite psr z2">
      <div class="c12 px2"><div class="bt1 c12"></div></div>
      <div class="x p1 c12">
        <div class="c12 x xjb">
          <div class="ttu p1 c4">
            Enoki
          </div>
          <div class="c4 p1 tac">
            <a href="https://github.com/jondashkyle/enoki-site/blob/master/content/${state.page.url}/${state.page.file}">Edit this page</a>
          </div>
          <div class="c4 p1 tar">
            <a href="#">Back to Top</a>
          </div>
        </div>
      </div>
    </div>
  `
}

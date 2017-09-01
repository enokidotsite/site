var html = require('choo/html')
var Header = require('./header')

var header = new Header()

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main class="x xdc c12 vhmn100 ptheader wcontent" sm="pt0">
        ${header.render({
            title: state.content.title,
            display: state.content.navigation !== false,
            order: state.content.order ? state.content.order : [ ],
            active: state.page ? state.page.path : '',
            links: state.content ? state.content.children : { }
        })} 
        <div class="c12 x1 x xdc">
          ${view(state, emit)}
        </div>
        ${footer(state, emit)}
      </main>
    `
  }
}

function footer (state, emit) {
  return html`
    <div class="c12 lh1 bgwhite psr z2">
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

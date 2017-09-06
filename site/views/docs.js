var html = require('choo/html')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x x1 xjc xac c12 p1">
      <div class="copy wmxcopy tac tdn px2">
        ${format(state.page.text)} 
      </div>
    </div>
  `
}

var html = require('choo/html')
var xtend = require('xtend')
var wrapper = require('../components/wrapper')
var entry = require('../components/entries')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x xw p1" style="margin-bottom: -1.6rem">
      ${entry(xtend(state.page, { format: 'longform' }))}
    </div>
  `
}

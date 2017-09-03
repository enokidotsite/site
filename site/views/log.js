var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var entry = require('../components/entries')

module.exports = wrapper(log)

function log (state, emit) {
  return html`
    <div class="x xw p1" style="margin-bottom: -1.6rem">
      ${objectValues(state.page.children)
        .filter(page => !page.draft)
        .reverse()
        .map(entry)
      }
    </div>
  `
}


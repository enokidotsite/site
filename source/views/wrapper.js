var html = require('choo/html')
var loading = require('../components/loading')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    if (!state.chat.loaded || !state.site.loaded) {
      return html`<body>${loading(state)}</body>`
    }

    return html`
      <body>
        ${view(state, emit)}
      </body>
    `
  }
}

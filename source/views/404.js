var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }

  :host a {
    color: var(--foreground);
    text-decoration: none;
  }
`

var TITLE = 'enoki | not found'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <div class="${styles}">
      <a href="/">Page not found</a>
    </div>
  `
}

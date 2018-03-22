var raw = require('choo/html/raw')
var md = require('nano-markdown')
var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    background: var(--foreground);
    color: var(--grey50);
    font-family: var(--mono);
    display: block;
    padding: 2rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    justify-content: space-between;
  }

  :host.grow { padding: 2rem 2rem 10rem }

  :host > div { text-align: center }

  :host a {
    color: var(--grey50);
    text-decoration: none;
  }

  @media (min-width: 767px) {
    :host,
    :host.grow {
      display: flex;
      padding: 4rem;
    }

    :host > div:nth-child(1) { text-align: left }
    :host > div:nth-child(2) { text-align: right }
  }
`

module.exports = footer

function footer (state, emit) {
  var site = Page(state)('/')
  var shouldGrow = state.href === '/'

  return html`
    <footer class="${styles} ${shouldGrow ? 'grow' : ''}">
      <div>
        ${raw(md(site.value('credit') || ''))}
        <span>${site.value('quote')}</span>
      </div>
      <div>
        <span>${site.value('location')}</span>
        <p><a href="mailto:${site.value('email')}">${site.value('email')}</a></p>
      </div>
    </footer>
  `
}

var Header = require('../components/header')
var raw = require('choo/html/raw')
var html = require('choo/html')
var md = require('nano-markdown')

var header = new Header()

var TITLE = 'Enoki'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  var page = state.content[state.href || '/'] || { }

  return html`
    <body>
      ${header.render({
        title: page.title,
        subtitle: page.subtitle
      })}
      <nav class="action-bar">
        <a href="https://panel.enoki.site" class="button get-started">${page.started}</a>
      </nav>
      ${renderFeatures({
        features: state.content['/features']
      })}
      <footer>
        <span>${page.credit}</span>
        <span>${page.quote}</span>
      </footer>
    </body>
  `
}

function renderFeatures (props) {
  var features = Object.values(props.features)
  return html`
    <ul class="features">
      ${features.map(renderFeature)}
    </ul>
  `
}

function renderFeature (props) {
  return html`
    <li>
      <h3>${props.title}</h3>
      <p>${raw(md(props.text))}</p>
    </li>
  `
}

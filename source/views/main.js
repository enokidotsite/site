var Subscribe = require('../components/subscribe')
var Prerelease = require('../components/prerelease')
var Header = require('../components/header')
var raw = require('choo/html/raw')
var md = require('nano-markdown')
var html = require('choo/html')

var header = new Header()
var subscribe = new Subscribe()
var prerelease = new Prerelease()

var TITLE = 'Enoki'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  var page = state.content[state.href || '/'] || { }

  return html`
    <body>
      ${prerelease.render()}
      ${header.render()}
      <nav class="action-bar">
        <div class="button get-started">
          Request an invite
          ${subscribe.render()}
        </div>
      </nav>
      <section class="subtitle">
        <h2>${raw(md(page.subtitle || ''))}</h2>
      </section>
      <section class="features">
        ${renderFeatures({
          features: state.content['/features'],
          content: state.content
        })}
      </section>
      <footer>
        <div>
          ${raw(md(page.credit || ''))}
          <span>${page.quote}</span>
        </div>
        <div>
          <span>${page.location}</span>
          <p><a href="mailto:${page.email}">${page.email}</a></p>
        </div>
      </footer>
    </body>
  `
}

function renderFeatures (props) {
  if (!props.features) return
  var features = props.features.order
    .split('\n')
    .map(feature => feature.replace('- ', ''))
    .map(feature => props.content[props.features.pages[feature].url])
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

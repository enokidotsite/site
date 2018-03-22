var raw = require('choo/html/raw')
var md = require('nano-markdown')
var Page = require('enoki/page')
var html = require('choo/html')

var Subscribe = require('../components/subscribe')
var Prerelease = require('../components/prerelease')
var livestream = require('../components/livestream')
var Header = require('../components/header')
var footer = require('../components/footer')

var header = new Header()
var subscribe = new Subscribe()

var TITLE = 'enoki'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  var page = Page(state)
  var active = state.content[state.href || '/'] || { }
  var log = page('/log')
    .children()
    .sortBy('date', 'desc')
    .value()

  return html`
    <div>
      <nav class="action-bar">
        <div class="button get-started">
          Request an Invite
          ${subscribe.render()}
        </div>
      </nav>
      ${header.render({
        active: state.chat.live !== true
      })}
      <section class="subtitle">
        <h2>${raw(md(active.subtitle || ''))}</h2>
      </section>
      <section class="features">
        ${renderFeatures({
          features: state.content['/features'],
          content: state.content
        })}
      </section>
      <section class="featured">
        ${renderLogFeatured(log[0])}
        ${renderP2pWeb()}
      </section>
      ${footer(state)}
    </div>
  `

  function renderP2pWeb (props) {
    return html`
      <div class="p2p-web">
        <a href="${state.site.p2p ? 'dat://' : 'https://'}peer-to-peer-web.com" target="_blank">
          <img src="/assets/p2p-web.svg">
        </a>
      </div>
    `
  }

  function renderLogFeatured (props) {
    var background = page(props).file('stream.svg')
    return html`
      <div class="log-featured">
        <a href="${props.url}">
          <img src="${background.value('url')}">
        </a>
      </div>
    `
  }
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

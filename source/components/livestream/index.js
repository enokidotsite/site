var html = require('choo/html')
var css = require('sheetify')

var channel = require('./channel')
var chat = require('./chat')
var styles = css('./index.css')

module.exports = livestream

function livestream (state, emit) {
  return html`
    <div class="${styles}">
      <div class="channel-container">
        ${channel()}
      </div>
      <div class="chat-container">
        ${chat(state, emit)}
      </div>
    </div>
  `
}

var externalLinks = require('markdown-it-external-links')
var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var md = new markdown({
  linkify: true
})

md.use(externalLinks, {
  externalTarget: ['_blank']
})

module.exports = chat

function chat (state, emit) {
  return html`
    <div class="chat">
      <div class="chat-messages" data-messages>
        ${state.chat.messages.map(elMessage)}
      </div>
      <form onsubmit=${handleSubmit}>
        ${elInput()}
        ${elSubmit()}
      </form>
    </div>
  `

  function elInput () {
    return html`
      <textarea
        onkeypress=${handleKeyPress}
        oninput=${handleInput}
        placeholder="message…"
        class="w100 fs1 ff-sans m0 px1 py0-5 bgc-black fc-white br1-5 lh1-5"
      />${raw(state.chat.user.message)}</textarea>
    `
  }

  function elSubmit () {
    return html`
      <button type="submit">
        Submit
      </button>
    `
  }

  function elMessage (data) {
    return html`
      <div class="message ${state.chat.user.name === data.name ? 'active' : ''}">
        ${raw(md.render(data.message))}
      </div>
    `
  }

  function handleKeyPress (event) {
    if (event.charCode === 13 && !event.shiftKey) {
      emit(state.events.CHAT_SEND, state.chat.user)
      event.preventDefault()
    }
  }

  function handleInput (event) {
    emit(state.events.CHAT_USER, {
      message: event.target.value
    })
  }

  function handleSubmit (event) {
    emit(state.events.CHAT_SEND, state.chat.user)
    event.preventDefault()
  }
}
var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xhr = require('xhr')

var styles = css`
  :host .subscribe-note {
    background: var(--yellow);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

module.exports = class Subscribe extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      success: false,
      loading: false,
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  createElement (props, emit) {
    return html`
      <div class="${styles}">
        ${this.renderContent()}
      </div>
    `
  }

  renderContent () {
    this.form = this.renderForm()
    if (this.state.loading) return this.renderLoading()
    if (this.state.success) return this.renderSuccess()
    return this.form
  }

  renderLoading () {
    return html`
      <div class="subscribe-note">
        <div class="load"></div>
      </div>
    `
  }

  renderSuccess () {
    return html`
      <div class="subscribe-note">
        Success!
      </div>
    `
  }

  renderForm () {
    return html`
      <form onsubmit=${this.handleSubmit}>
        <input
          id="field_0"
          name="embedded_form_subscription[field_0]"
          type="email"
          value="${this.state.value}"
          placeholder="Email address"
          oninput=${this.handleInput}
          required
        >
        <input
          type="text"
          style="display: none"
          name="hpf4b50a9a-19a4-11e8-a3c9-06b79b628af2"
          tabindex="-1"
          aria-hidden="true"
          autocomplete="nope"
        >
        <button type="submit" style="display: none;">Subscribe</button>
      </form>
    `
  }

  handleInput (event) {
    this.state.value = event.target.value
    this.rerender()
  }

  handleSubmit (event) {
    var self = this

    this.state.loading = true
    event.preventDefault()
    self.rerender()

    xhr({
        method: 'post',
        body: new FormData(this.form),
        uri: 'https://emailoctopus.com/lists/f4b50a9a-19a4-11e8-a3c9-06b79b628af2/members/embedded/1.1/add'
    }, function (err, resp, body) {
      if (err || resp.statusCode !== 200) {
        self.state.error = true
      } else {
        self.state.success = true
      }
      self.state.loading = false
      self.rerender()
    })
  }

  update () {
    return false
  }
}

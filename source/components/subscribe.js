var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

module.exports = class Subscribe extends Nanocomponent {
  constructor () {
    super()
    this.state = {

    }
  }

  createElement (props, emit) {
    return html`
      <div>
          <p class="email-octopus-error-message"></p>

          <form method="post" onsubmit=${this.submit}>
              
              <div class="email-octopus-form-row">
                  <label for="field_0">Email Address</label>
                  <input id="field_0" name="embedded_form_subscription[field_0]" type="email" placeholder="">
              </div>
                              

              <div class="email-octopus-form-row-hp" aria-hidden="true">
                  <!-- Do not remove this field, otherwise you risk bot sign-ups -->
                  <input type="text" name="hpf4b50a9a-19a4-11e8-a3c9-06b79b628af2"
                     tabindex="-1"
                     autocomplete="nope">
              </div>

              <div class="email-octopus-form-row-subscribe">
                  <input type="hidden"
                     name="successRedirectUrl"
                     value="">
                  <button type="submit">Subscribe</button>
              </div>
          </form>
      </div>
    `
  }

  submit () {
    // https://emailoctopus.com/lists/f4b50a9a-19a4-11e8-a3c9-06b79b628af2/members/embedded/1.1/add
    console.log('submit')
  }

  update () {
    return false
  }
}
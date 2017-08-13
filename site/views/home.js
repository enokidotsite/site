var html = require('choo/html')
var ov = require('object-values')

var wrapper = require('../components/wrapper')
var format = require('../components/format')
var thumbnail = require('../components/thumbnail')

module.exports = wrapper(home)

function home (state, emit) {
  return html`
    <div class="c12 p1 fs2">
      <div class="mh50vh sm-dn"></div>
      <div class="p1">
        ${text(state.page.text)}
      </div>
      <div class="p1 mt4">
        ${text(state.page.preview)}
      </div>
      <div class="p1 mt4">
        ${text(state.page.email)}
      </div>
      ${mailinglist()}
      <div class="p1 mt4">
        ${text(state.page.contact)}
      </div>
      <div class="mh25vh sm-dn"></div>
    </div>
  `

  function text (text) {
    return html`
      <div class="c12 copy wmxcopy">
        ${format(text)}
      </div>
    `
  }

  function mailinglist () {
    return html`
      <form action="//site.us16.list-manage.com/subscribe/post?u=6c1bdf35956595ebb0339b962&amp;id=6710f821fe" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div class="x sm-mt4">
          <div class="p1 c12 wmxcopy">
            <input type="email" value="" placeholder="Email address" name="EMAIL" class="c12 p1 sm-p2 fs2 ffsans fwn br1" id="mce-EMAIL">
          </div>
          <div class="p1">
            <input type="submit" value="Join" name="subscribe" id="mc-embedded-subscribe" class="curp bgblack tcwhite p1 sm-p2 fs2 fwb br1 ffsans">
          </div>
        </div>
        <div id="mce-responses" class="clear">
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6c1bdf35956595ebb0339b962_6710f821fe" tabindex="-1" value=""></div>
      </form>
    `
  }
}

var html = require('choo/html')
var xtend = require('xtend')
var path = require('path')
var objectValues = require('object-values')

var wrapper = require('../components/wrapper')
var format = require('../components/format')
var unorphan = require('../components/unorphan')

module.exports = wrapper(home)

function home (state, emit) {
  var logLatest = getLatestChild(state.content.children.log.children)
  var guideLatest = getLatestChild(state.content.children.guides.children)

  return html`
    <div class="c12 fs1 x xw p1">
      <div class="c12 fs4 p1 py2 psr z2 wmxheading">
        ${unorphan(state.page.heading)}
      </div>
      <div class="c6" sm="c12">
        <div class="p1">
          ${text(state.page.text)}
        </div>
      </div>
      <div class="c6 p1 ophc" sm="c12">
        ${photo()}
      </div>
      <div class="c12 p1"><div class="bb1"></div></div>
      <div class="c4 p1 x" sm="c12">
        <a href="/guides" class="bgblack tcwhite p2 copy c12">
          ${format(state.page.started)}
        </a>
      </div>
      <a href="/docs" class="c4 p1 x" sm="c12">
        <div class="bgblack tcwhite p2 copy c12">
          ${format(state.page.docs)}
        </div>
      </a>
      <div class="c4 p1 x" sm="c12">
        <div class="bgblack tcwhite p2 copy c12">
          ${format(state.page.email)}
        </div>
      </div>
      <div class="c12 p1"><div class="bb1"></div></div>
      <div class="c12 p1">
        ${screenshot()}
      </div>
      <div class="c12 p1"><div class="bb1"></div></div>
      ${thumbnailEntry(xtend(logLatest, { subtitle: 'Latest From the Log' }))}
      ${thumbnailEntry(xtend(guideLatest, { subtitle: 'Recent Learning Guide' }))}
    </div>
  `

  function getLatestChild (children) {
    var children = objectValues(children).filter(child => !child.draft).reverse()
    if (children.length >= 0) {
      return children[0]
    } else {
      return undefined
    }
  }

  function thumbnailEntry (props) {
    var thumb = props.files[props.thumbnail]
    var border = props.thumbnailborder ? 'ol1' : ''
    return html`
      <a href="${props.url}" class="x c6" sm="c12">
        <div class="c12 p1 py2 tac">
          <h4>${props.subtitle}</h4><br>
          <h3 class="px2">${unorphan(props.title)}</h3>
          <div class="py2 c12"></div>
        </div>
      </a>
    `
  }

  function photo () {
    return html`
      <div
        class="psr bggreylight mthome"
        sm="mt0"
        style="padding-bottom: 100%;"
      >
        <img src="/circle.jpg" class="psa t0 l0 b0 c12">
        <div class="psa b0 l0 p1 copy op0 oph100 lh1">
          Photo via <a href="http://informationalaffairs.com/" target="_blank">Informational Affairs</a>
        </div>
      </div>
    `
  }

  function screenshot () {
    return html`
      <div class="psr c12" style="padding-bottom: 49.9752107%">
        <a href="/guides/002-panel-preview/">
          <img src="/assets/starterkit-thumb.png" class="psa t0 l0 h100 w100">
        </a>
      </div>
    `
  }

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

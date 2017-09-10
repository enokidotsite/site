var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var entry = require('../components/entries/longform')

module.exports = wrapper(log)

function log (state, emit) {
  return html`
    <div class="x xw p1" style="margin-bottom: -1.6rem">
      ${objectValues(state.page.children)
        .filter(page => !page.draft)
        .reverse()
        .map(container)
      }
    </div>
  `

  function container (props) {
    return html`
      <div>
        <div class="py1">
          ${entry(props)}
        </div>
        <div class="c12 p1"><div class="bb1"></div></div>
      </div>
    `
  }
}


function thumbnail (props) {
  var image = props.files[props.thumbnail] || { }
  if (props.draft) return // skip the drafts

  return html`
    <div class="p1 c6 mb1" md="c12">
      <a href="${props.url}" class="db">
        <div
          class="psr bggreylight ${props.thumbnailborder ? 'ol1' : ''}"
          style="padding-bottom: ${image.ratioY * 100}%"
        >
          <img src="${image.url}" class="psa t0 l0 c12" />
        </div>
        <div class="py1">
          <h3>${props.title}</h3>
        </div>
        <div>
          ${props.excerpt}
        </div>
      </div>
    </div>
  `
}
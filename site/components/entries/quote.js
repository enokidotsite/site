var html = require('choo/html')
var format = require('../format')

module.exports = basic

function basic (props) {
  return html`
    <div class="x c12">
      <div class="c4" sm="dn"></div>
      <div class="c8 p1 copy wmxcopy" sm="c12">
        ${format(props.text)}
      </div>
    </div>
  `
}

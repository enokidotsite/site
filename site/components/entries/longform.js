var html = require('choo/html')
var format = require('../format')
var raw = require('../raw')
var unorphan = require('../unorphan')

module.exports = longform

function longform (props) {
  return html`
    <div class="c12 x xw">
      <div class="c12 p1">
        <div class="wmxheading mb2">
          <h2>${unorphan(props.title)}</h2>
        </div>
      </div>
      <div class="c4 p1" sm="c12">
        <ul>
          <li>${props.date}</li>
          <li>${props.tags.join(', ')}</li>
        </ul>
      </div>
      <div class="c8 p1" sm="c12">
        <div class="copy wmxcopy">
          ${props.text ? format(props.text) : ''}
        </div>
      </div>
    </div>
  `
}
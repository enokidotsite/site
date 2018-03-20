var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="bootstrap-load"></div>
  `  
}
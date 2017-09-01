var format = require('./format')
var raw = require('./raw')

module.exports = unorphan

function unorphan (str) {
  return raw(str.replace(/ (?=[^ ]*$)/i, '&nbsp;'))
}
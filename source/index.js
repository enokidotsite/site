var choo = require('choo')
var wrapper = require('./views/wrapper')
require('./design')

var app = choo()

app.use(require('enoki/choo')())
app.use(require('./stores/stream'))

app.route('/', wrapper(require('./views/main')))
app.route('/log/*', wrapper(require('./views/entry')))
app.route('/*', wrapper(require('./views/404')))

if (!module.parent) app.mount('body')
else module.exports = app

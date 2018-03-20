var choo = require('choo')
require('./design')
var wrapper = require('./views/wrapper')

var app = choo()

app.use(require('enoki/choo')())
app.use(require('./stores/stream'))

app.route('/', wrapper(require('./views/main')))
app.route('/*', wrapper(require('./views/404')))

if (!module.parent) app.mount('body')
else module.exports = app

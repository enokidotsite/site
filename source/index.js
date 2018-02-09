var choo = require('choo')
require('./design')

var app = choo()

app.use(require('./stores/content'))
app.use(require('./stores/clicks'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app

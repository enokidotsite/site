var html = require('bel')
var MarkdownIt = require('markdown-it')
var implicitFigures = require('markdown-it-implicit-figures')
var video = require('markdown-it-video')
var raw = require('./raw')

var md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

md.use(implicitFigures)
md.use(video)

module.exports = format

function format (str) {
  str = str || ''
  return raw(md.render(str))
}

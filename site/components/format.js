var html = require('bel')
var MarkdownIt = require('markdown-it')
var implicitFigures = require('markdown-it-implicit-figures')
var html5 = require('markdown-it-html5-embed')
var video = require('markdown-it-video')
var raw = require('./raw')

var md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

md.use(implicitFigures)
md.use(video)
md.use(html5, {
  html5embed: {
    useImageSyntax: true,
    attributes: {
      video: 'height="720" width="1280" class="audioplayer"'
    }
  }
})

module.exports = format

function format (str) {
  str = str || ''
  return raw(md.render(str))
}

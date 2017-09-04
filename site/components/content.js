var html = require('choo/html')
var Nanocomponent = require('nanocomponent')
var xtendMutable = require('xtend/mutable')
var format = require('./format')

module.exports = module.exports = function Wrapper () {
  if (!(this instanceof Content)) return new Content()
}

class Content extends Nanocomponent {
  constructor () {
    super()
    this.props = {
      text: ''
    }
  }

  createElement (props) {
    return html`
      <div class="copy wmxcopy">
        ${format(props.text)}
      </div>
    `
  }

  load () {
    this.refresh()
  }

  update (props) {
    // new text
    if (props.text !== this.props.text) {
      this.props = props
      this.refresh()
      return true
    }

    return false
  }

  refresh () {
    var videos = [...this.element.querySelectorAll('video')]
    videos.forEach(this.createVideo)
  }

  createVideo (element) {
    var sourceVideo = element.querySelector('source').getAttribute('src')
    var sourceImg = sourceVideo.replace('.mp4', '.png')
    var image = html`<img
      src="${sourceImg}"
      onclick=${handleImageClick}
    >`

    // dom manipulation
    element.parentNode.appendChild(image)
    element.addEventListener('click', handleVideoClick, false)

    // parent size
    xtendMutable(element.parentNode.style, {
      position: 'relative',
      height: '0',
      paddingBottom: element.height / element.width * 100 + '%'
    })

    // video size
    xtendMutable(element.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    })

    function handleImageClick (event) {
      event.target.style.display = 'none'
      element.play()
    }

    function handleVideoClick (event) {
      if (!event.target.paused) {
        event.target.pause()
      } else {
        event.target.play()
      }
    }
  }
}
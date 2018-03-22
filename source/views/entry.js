var raw = require('choo/html/raw')
var html = require('choo/html')
var Page = require('enoki/page')

var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var title = 'enoki - ' + page().value('title')
  var thumbnail = page().file('thumbnail.png')

  if (state.title !== title) {
    emit(state.events.DOMTITLECHANGE, title)
  }

  return html`
    <div class="container-entry">
      <div class="content-entry-video">
        <nav>
          <h2>${page().value('title')}</h2>
          <a href="/">← <span>HOME</span></a>
        </nav>
        <div class="media-entry-video">
          <div
            class="media-entry-video-thumbnail"
            style="background-image: url(${thumbnail.value('source')})"
            onclick=${handleClick}
          >${state.site.p2p ? 'PLAY' : ''}</div>
          ${!state.site.p2p ? renderHttp() : ''}
        </div>
      </div>
      ${footer(state)}
    </div>
  `

  function renderHttp () {
    return html`
      <div class="media-entry-http">
        <a
          href="dat://enoki.site${page().url()}"
          class="non-p2p"
        >Open in Beaker Browser</a>
        <div class="non-p2p-links">
          <a href="https://beakerbrowser.com">Download Beaker</a> 
          <a href="${page().value('video')}">dat:// direct link</a>
        </div>
      </div>
    `
  }

  function handleClick (event) {
    var el = event.target
    var parent = el.parentNode
    var video = html`
      <div>
        <video
          poster="${thumbnail.value('source')}"
          src="${page().value('video')}"
          onclick=${handleVideoClick}
          autoplay
        ></video>
        <div class="non-p2p-links">
          <div></div>
          <span style="cursor: pointer;" onclick=${handleCopyClick}>create a copy</span>
        </div>
      </div>
    `

    parent.removeChild(el)
    parent.appendChild(video)
  }

  function handleVideoClick (event) {
    if (event.target.paused) event.target.play()
    else event.target.pause()
  }

  async function handleCopyClick (event) {
    try {
      await DatArchive.fork(page().value('video'))
    } catch (err) {
      console.warn(err)
    }
  }
}

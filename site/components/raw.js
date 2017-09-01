var html = require('choo/html')

module.exports = rawCreateElement

function rawCreateElement (tag) {
  return (typeof window !== 'undefined') ? browser() : server()

  function browser () {
    var el = html`<div></div>`
    el.innerHTML = tag
    return toArray(el.childNodes)
  }

  function server () {
    var wrapper = new String(tag)
    wrapper.__encoded = true
    return wrapper
  }
}

function toArray (arr) {
  return Array.isArray(arr) ? arr : [].slice.call(arr)
}
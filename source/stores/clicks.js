module.exports = store

function store (state, emitter) {
  state.angle = 0.5

  emitter.on('angle', function (angle) {
    state.angle = angle
    emitter.emit(state.events.RENDER)
  })
}

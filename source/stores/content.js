module.exports = content

function content (state, emitter, app) {
  state.content = {
    '/': {
      title: 'Enoki',
      subtitle: 'An experimental tool for self-publishing\non the peer-to-peer web',
      started: 'Get Started',
      credit: '2018 — Los Angles, Calif.',
      quote: 'It unfolds as you write it'
    },
    '/features': {
      free: {
        title: 'Free',
        text: 'Culture wants to be free. No monthly hosting fees or billing to keep up with.'
      },
      p2p: {
        title: 'Peer-to-peer',
        text: 'Instead of being confined to a centralized platform, publish directly with [Dat](https://datproject.org).'
      },
      offline: {
        title: 'Offline first',
        text: 'No internet connection? No problem. Sync changes automatically when reconnecting.'
      },
      data: {
        title: 'Own your data',
        text: 'This is a tool, not a platform. Your data stays with you.'
      },
      history: {
        title: 'Infinite history',
        text: 'Gone and biffed it? Revert to previous verisons of your site anytime.'
      },
      simple: {
        title: 'Beginner friendly',
        text: '[Choo](https://choo.io) is the friendliest front-end framework, and is the basis for the Designs and Panel.'
      },
      nodb: {
        title: 'No database',
        text: 'Only static files and folders, meaning your work is easily portable and archivable.'
      },
      extendable: {
        title: 'Extendable',
        text: 'Easily create custom field types for project specific interfaces.'
      },
      opensource: {
        title: 'Open source',
        text: 'Developed using some of the best open source projects, and released open source.'
      }
    }
  }
}

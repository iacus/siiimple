/* src/app.js */

'use strict'

import Debug from './debug/debug'
import Checks from './debug/checks'
import ShowSections from './show-sections/show-sections'
import LazyLoad from './lazy-load/lazy-load'

const initFun = () => {
  new Debug().init()
  new Checks().init()
  new ShowSections().init()
  new LazyLoad().init()
}


function documentReady (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
    console.log('Ready!')
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState !== 'loading') {
        fn()
      }
    })
  }
}
documentReady(initFun)

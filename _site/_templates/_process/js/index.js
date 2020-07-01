/* src/app.js */

'use strict'

import Debug from './debug/debug'
import Checks from './debug/checks'
// import LazyLoad from './lazy-load/lazy-load'
// import LoopScroll from './loop-scroll/loop-scroll'
// import AnimateLabel from './animate-label/animate-label'
// import ShowSections from './show-sections/show-sections'
// import ShowContent from './show-content/show-content'
// import Cursor from './cursor/cursor'
//
// import InfiniteMenu from './loop-scroll/infinitemenu'
// import InitLoop from './loop-scroll/init-loop';



const initFun = () => {
  new Debug().init()
  new Checks().init()
  // new AnimateLabel().init()
  // new ShowSections().init()
  // new ShowContent().init()
  // new Cursor().init()
  // new InitLoop().init()
  //
  // setTimeout(function () {
  //   new LazyLoad().init()
  // }, 2000);

}
// new InfiniteMenu()
// new LoopScroll().init()

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

'use strict'

import Utils from '../utils/utils.js'

export default class Checks {
  constructor() {
    this.config = {
      BREAKPOINTS: false
    }
    this.Utils = new Utils

  }

  isJs () {
    console.log('is js');
    document.documentElement.classList.add('js');
  }

  hasTouchScreen () {
    const checkDevice = () => {
      console.log('resize');
      if (this.Utils.hasTouchScreen()) {
        document.documentElement.classList.add('is-touch');
        document.documentElement.classList.remove('no-touch');
      } else {
        document.documentElement.classList.add('no-touch');
        document.documentElement.classList.remove('is-touch');
      }
    }

    window.addEventListener('resize',checkDevice)
    checkDevice()
  }

  showBreakpoints () {
    if (this.config.BREAKPOINTS) {
      console.log('showing breakpoints');
      document.querySelector('body').classList.add('show-breakpoints');

      const getWidth = () => {
        document.querySelector('body').setAttribute('data-width', window.innerWidth+'px');
      }

      window.addEventListener('resize',getWidth)
      getWidth()

    }
  }

  init() {
    this.isJs()
    this.hasTouchScreen()
    this.showBreakpoints()
  }
}

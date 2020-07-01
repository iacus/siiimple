'use strict'

import Utils from '../utils/utils.js'

export default class Checks {
  constructor() {
    this.config = {
      BREAKPOINTS: true
    }
    this.Utils = new Utils

  }

  isJs () {
    console.log('is js');
    document.documentElement.classList.add('js');
  }

  isMobile () {
    if (this.Utils.isMobile()) {
      console.log('is mobile');
      document.documentElement.classList.add('is-mobile');
    }
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
    this.isMobile()
    this.showBreakpoints()
  }
}

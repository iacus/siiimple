'use strict'

import Utils from '../utils/utils.js'

import {
    gsap,
    TweenMax,
    CSSPlugin,
    Expo,
    ScrollToPlugin
} from "gsap/all";

// Ensure modules don't get dropped by tree-shaking
const activated = [
    TweenMax,
    CSSPlugin,
    Expo,
    ScrollToPlugin
];

gsap.registerPlugin(ScrollToPlugin);

export default class InitLoop {
  constructor() {
    this.config = {
      heightFix: '40px',
      topLimit: 10,
      bottomLimit: document.body.scrollHeight - window.innerHeight - 500
    }
    this.loopWrapper = document.querySelector('.loop')
    this.navbar = document.querySelector('.navbar')
    this.cursor = document.querySelector('.cursor')
    this.Utils = new Utils
  }

  startAnimation() {
    const cbStart = () => {

    }
    // Versión scrollando al tope de la sección
    let scrollTo = this.Utils.randomNum(this.config.bottomLimit - 300,this.config.bottomLimit - 1)
    TweenMax.fromTo(this.loopWrapper, 1.5,{opacity: 0 , delay: .3 , ease: Expo.easeInOut},{opacity: 1, delay: .3 , ease: Expo.easeInOut})
    TweenMax.fromTo(window, 2,{scrollTo:{y:this.config.topLimit} , delay: .3 , ease: Expo.easeInOut, onStart: cbStart},{scrollTo:{y:scrollTo} , delay: .3 , ease: Expo.easeInOut})
    TweenMax.fromTo(this.navbar, 1.5,{opacity: 0 , delay: 1.8 , ease: Expo.easeInOut},{opacity: 1, delay: 1.8 , ease: Expo.easeInOut})
    TweenMax.fromTo(this.cursor, 1.5,{opacity: 0 , delay: 1.8 , ease: Expo.easeInOut},{opacity: 1, delay: 1.8 , ease: Expo.easeInOut})

  }

  init() {

    if (document.querySelector('.loop')) {
      this.startAnimation()
    }


  }
}

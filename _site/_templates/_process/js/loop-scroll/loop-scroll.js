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

const winsize = { width: window.innerWidth, height: window.innerHeight }

gsap.registerPlugin(ScrollToPlugin);

export default class LoopScroll {
  constructor() {
    this.DOM = {el: document.querySelector('.loop')};
    this.DOM.menuItems = [...this.DOM.el.querySelectorAll('li')];
    this.config = {
      heightFix: '40px',
      topLimit: 10,
      bottomLimit: document.body.scrollHeight - 10
    }
    this.loopWrapper = document.querySelector('.loop')
    this.navbar = document.querySelector('.navbar')
    this.cursor = document.querySelector('.cursor')
    this.Utils = new Utils()
  }

  cloneItems() {
      // Get the height of one menu item
      const itemHeight = this.DOM.menuItems[0].offsetHeight;
      // How many items fit in the window?
      const fitIn = Math.ceil(winsize.height / itemHeight);
      // Create [fitIn] clones from the beginning of the list

      // Remove any
      this.DOM.el.querySelectorAll('.loop__clone').forEach(clone => this.DOM.el.removeChild(clone));
      // Add clones
      let totalClones = 0;
      this.DOM.menuItems.filter((_, index) => (index < fitIn)).map(target => {
          const clone = target.cloneNode(true);
          clone.classList.add('loop__clone');
          this.DOM.el.appendChild(clone);
          ++totalClones;
      });

      // All clones height
      this.clonesHeight = totalClones * itemHeight;
      // Scrollable area height
      this.scrollHeight = this.DOM.el.scrollHeight;
  }

  scrollUpdate() {
    // Movemos el scroll x pixels
    let topLimit = this.config.topLimit
    let bottomLimit = this.config.bottomLimit

    window.scrollTo(0, topLimit * 2 )

    window.onscroll = function(ev)
    {
    	var B= document.body; //IE 'quirks'
            var D= document.documentElement; //IE with doctype
            D= (D.clientHeight)? D: B;

    	if (D.scrollTop <= topLimit)
    		{
          // console.log('top');
          window.scrollTo(0,bottomLimit)
    		}
      else if (D.scrollTop >= bottomLimit) {
        // console.log('bottom');
        window.scrollTo(0,topLimit)
      }
    };
  }

  init() {

    if (document.querySelector('.loop') && !this.Utils.isMobile()) {
      this.cloneItems()
      this.scrollUpdate()
    }



  }
}

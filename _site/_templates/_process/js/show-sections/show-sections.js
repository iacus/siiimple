'use strict'

import {
    TimelineMax,
    TweenMax,
    CSSPlugin,
    Expo
} from "gsap/all";

// Ensure modules don't get dropped by tree-shaking
const activated = [
    TimelineMax,
    TweenMax,
    CSSPlugin,
    Expo
];

export default class ShowSections {
  constructor() {
    this.config = {

    }

  }

  showNewsletter () {
    if ($('body').hasClass('newsletter-visible')) {
      // $('#newsletter').fadeOut('fast')
      // $('body').removeClass('newsletter-visible')
    } else {
      $('#newsletter').fadeIn('fast').css('display','flex')
      $('body').addClass('newsletter-visible')
    }
  }

  toogleNavbar () {
    if ($('body').hasClass('navbar-visible')) {
      $('.navbar-collapse').hide('fast').removeClass('is-visible')
      $('body').removeClass('navbar-visible')
    } else {
      $('body').addClass('navbar-visible')
      $('.navbar-collapse').delay('100ms').show('fast').addClass('is-visible')
    }
  }

  hideNavbar () {
    $('.navbar-collapse').hide('fast').removeClass('is-visible')
    $('body').removeClass('navbar-visible')
  }

  hideNewsletter () {
      $('#newsletter').fadeOut('fast')
      $('body').removeClass('newsletter-visible')
      this.removeAnchor()
  }

  showSection (section) {
    let tl = new TimelineMax
    const navbar = $('.navbar')
    const cb = () => {
      $('body').addClass('navbar-bottom')
      $(section).addClass('is-visible')
      this.hideNavbar()
    }
    const showBg = () => {
    TweenMax.to('.ly-hide-up', 0.3, { y: '0%' , ease: Expo.easeIn })
    }

    tl.to(navbar, .3, { top: '-5%' , delay: .1, ease: Expo.ease })
      .to(navbar, 0.3, { bottom: '0', top: 'auto' , ease: Expo.easeIn, onStart: showBg, onComplete: cb })
      .fromTo(section,.8, {opacity: 0, y: '-30px', display: 'flex' }, {opacity: 1, y: '0px', delay:.1 ,ease: Expo.ease })
  }

  toggleSection(section) {
    let tl = new TimelineMax
    let sectionToShow = section
    let sectionToHide = $('.is-visible')
    const cb = () => {
      this.hideNewsletter()
      $(sectionToHide).removeClass('is-visible')
      $(sectionToShow).addClass('is-visible')
    }

    tl.to(sectionToHide, .5, {opacity: 0, delay: .2, ease: Expo.easeInOut, onStart: cb})
      .to(sectionToHide, .5, {display: 'none', delay: .2, ease: Expo.easeInOut})
      .fromTo(sectionToShow, 1, {opacity: 0, y: '-30px', delay: .2 } ,{opacity: 1, y: '0px', display: 'flex', ease: Expo.ease })
  }

  hideAllSections() {
    let tl = new TimelineMax
    const navbar = $('.navbar')
    let sectionToHide = $('.is-visible')
    const cb = () => {
      $(sectionToHide).removeClass('is-visible')
      $('body').removeClass('navbar-bottom')
      this.removeAnchor()
    }

    const hideBg = () => {
    TweenMax.to('.ly-hide-up', 0.3, { y: '-100%' , ease: Expo.easeIn })
    }

    tl.to(navbar, .3, { top: '100%' , delay: .1, ease: Expo.ease })
      .to(navbar, 0.3, { top: '0%', bottom: 'auto' , ease: Expo.easeIn, onStart: hideBg})
      .to(sectionToHide,0, {opacity: 0, display: 'none', onStart: cb})

  }

  removeAnchor () {
    history.pushState('', document.title, location.href.replace( /#.*/, ''));
  }

  moveNav (current) {

    if ($('body').hasClass('navbar-bottom') && $(current).hasClass('is-visible')) {
      // this.hideSection(current)

    } else if ($('body').hasClass('navbar-bottom')) {
      this.toggleSection(current)

    } else {
      this.showSection(current)
      this.toogleScroll()
    }
  }

  toggleNavItemVisibility (current) {

    if (current != undefined) {
      $('.nav-link').removeClass('active')
      $(current).addClass('active')
    } else {
      $('.nav-link').removeClass('active')
    }

  }

  toogleScroll () {
    $('body').toggleClass('lock-scroll')
  }

  init() {
    const handler = (e) => {
      const current = e.currentTarget
      const target = e.currentTarget.hash

      this.toggleNavItemVisibility(current)
      // this.toogleNavbar()

      if (target === '#newsletter') {
        this.showNewsletter()
        this.hideNavbar()

      } else {
        this.moveNav(target)

      }

    }
    const closeHandler = (e) => {
      const current = e.currentTarget

      this.toggleNavItemVisibility(current)
      this.hideNavbar()

      if ($('body').hasClass('newsletter-visible')) {
        this.hideNewsletter()
      } else {
        this.hideAllSections()
        this.toogleScroll()
      }

    }
    const menuHandler = (e) => {
      const current = e.currentTarget
      this.toogleNavbar()
    }
    $(".navbar a[href^='#']").click(handler)
    $(".close").click(closeHandler)
    $(".navbar-toggler").click(menuHandler)


  }
}

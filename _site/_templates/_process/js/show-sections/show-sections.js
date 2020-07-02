'use strict'

export default class ShowSections {
  constructor() {
    this.config = {

    }

  }

  init() {
  const clickHandler = (e) => {
    const current = e.srcElement || e.target
    const trigger = $(current).parents('.menu-trigger')
    const menuInner = trigger.next('.menu-inner')

    trigger.toggleClass('open')
    if (trigger.hasClass('open')) {
      menuInner.delay(300).slideDown('fast')
    } else {
      menuInner.delay(300).slideUp('fast')
    }


  }

  const buttons = document.querySelectorAll('.menu-trigger')
  buttons.forEach((item, i) => {
    item.addEventListener('click',clickHandler)
  });

  }
}

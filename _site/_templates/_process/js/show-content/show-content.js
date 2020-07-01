'use strict'

import hoverintent from 'hoverintent/dist/hoverintent.min.js'

export default class ShowContent {
  constructor() {
    this.config = {

    }

  }

  showContent (current) {
    let content = $(current).find('.item-content')
    let website = $(current).attr('data-website')
    let loader = $(current).find('.loader')
    let video = current.querySelector('.js-player-wrapper')
    let image = current.querySelector('.item-content-image')

    if (video != null) {
      // Is video
      if (video.classList.contains('parsed')) {

        video.player.play()
        video.player.muted = false
        $('.item-website').html(website).fadeIn()
        $(content).fadeIn('fast')
        this.hideLoader (video,loader)
      }
    } else {
      // Is image or question
      $('.item-website').html(website).fadeIn()
      $(content).fadeIn('fast')
    }

  }

  hideLoader (video,loader) {
    video.player.on('timeupdate', event => {
      if (video.player.currentTime >= 0.15 && !video.classList.contains('loaded')) {
        loader.fadeOut('fast') //Ocultamos loader
        $(video).find('.plyr').fadeIn('fast') //Mostramos video (oculto de inicio)
        $(video).addClass('loaded') //Evitamos volver a entrar
      }
    });
  }

  hideContent (current) {

    this.pauseVideo(current)
    setTimeout(function () {
      $('.item-content').fadeOut('fast')
      $('.item-website').fadeOut()
    }, 50);

  }

  hideAllContent () {

    this.pauseAllVideos()

    setTimeout(function () {
      $('.item-content').fadeOut('fast')
      $('.item-website').fadeOut()
    }, 50);
  }

  pauseVideo (current) {
    if ($(current).parents('.js-player-wrapper').length != 0) {
      $(current).parents('.js-player-wrapper')[0].player.pause()
    }
  }

  pauseAllVideos () {
    // pause all videos parsed
    const items = document.querySelectorAll('.js-player-wrapper.parsed')
    items.forEach((item, i) => {
      item.player.pause()
    });
  }

  init() {
    const handlerIn = (e) => {
      let current = e.target || e.srcElement
      this.showContent(current)
    }
    const handlerOut = (e) => {
      let current = e.target || e.srcElement
      this.hideAllContent(current)
    }
    const handlerClick = (e) => {
      let current = e.target || e.srcElement
      e.preventDefault()
    }
    const handlerTouch = (e) => {
      let current = e.target || e.srcElement
      e.preventDefault()

      this.hideAllContent(current)

      setTimeout(() => {
        this.showContent(current)
      }, 80);

    }
    const items = document.querySelectorAll('.item-link')
    items.forEach((item, i) => {
      if (document.documentElement.classList.contains('is-mobile')) {
        item.addEventListener('touchstart',handlerTouch)
        item.addEventListener('click',handlerClick)
      } else {
        hoverintent(item,handlerIn,handlerOut)
      }

    });

  }
}

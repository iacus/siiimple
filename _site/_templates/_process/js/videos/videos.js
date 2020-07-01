'use strict'

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default class Videos {
  constructor () {
    this.config = {
      videos: ".js-player"
  }
  this.videos = document.querySelectorAll(this.config.videos)
  this.players = []
  }

  parseVideos(){

    const players = Array.from(document.querySelectorAll('.js-player')).map(p => {
      let plyr = new Plyr(p,
        {
              autoplay : false,
              autopause: true,
              muted: false,
              loop: { active: true },
              controls: ['fullscreen']
        })
        p.player = plyr
    });

  }

  hideVideos() {
    $('.overlay-player').hide()
    $('body').removeClass('open')
    $('.title-video').addClass('hide')
  }

  mouseHandler () {
    const clickHandler = (e) => {
      let current = e.target || e.srcElement

      this.hideVideos()
      let videoFrame = $(current).next('.overlay-player')
      let closeEl = $(current).next('.overlay-player').find('.close')

      videoFrame.css('display','flex')
      $('body').addClass('open')
      window.player[current.videoIndex].play()

    }
    const mouseEnterHandler = (e) => {
      let current = e.target || e.srcElement

      this.hideVideos()
      let videoFrame = $(current).next('.overlay-player')
      let closeEl = $(current).next('.overlay-player').find('.close')

      videoFrame.css('display','flex')
      $('body').addClass('open')
      window.player[current.videoIndex].play()

    }
    document.querySelectorAll('.video-trigger').forEach((item, i) => {
      item.videoIndex = i
      item.addEventListener('click',clickHandler)
      item.addEventListener('mouseenter',mouseEnterHandler)
    });
  }

  closeHandler () {
    const clickHandler = (e) => {
      let current = e.target || e.srcElement
      this.hideVideos()

      window.player[current.videoIndex].pause()

    }
    document.querySelectorAll('.close').forEach((item, i) => {
      item.videoIndex = i
      item.addEventListener('click',clickHandler)
    });
    document.querySelectorAll('.close-area').forEach((item, i) => {
      item.videoIndex = i
      item.addEventListener('click',clickHandler)
    });
  }

  init () {
    this.parseVideos()
    // this.mouseHandler()
    // this.closeHandler()
  }
}

'use strict'

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default class LazyLoad {
  constructor() {
    this.config = {

    }

  }

  parseVideo(item){

    let plyr = new Plyr(item.querySelector('.js-player'),
      {
            autoplay : true, //Parece que en Chrome es la solución
            autopause: true,
            muted: true,
            loop: { active: true },
            controls: ['play','fullscreen']
      })

      // Como tenemos autoplay, en el momento que comienza el video
      // Se ejecutan los siguientes controles
      plyr.once('play', event => {
        plyr.muted = true
        plyr.pause()
        this.parseDefaultVideoControls (item,plyr)
      });

      item.classList.add('parsed')
      item.player = plyr //Lo guardamos en el objeto player del padre

  }

  parseDefaultVideoControls (item,player) {
    // Con esta función evitamos que los controles del video sean afectados
    // por el link de la caja a la web de artista
    let buttons = item.querySelectorAll("[data-plyr]");

    buttons.forEach((item) => {
      const handlerClick = (e) => {
        e.preventDefault()
      }

      item.addEventListener('click',handlerClick)
    })

  }

  preloadContent (current) {
    let video = current.querySelector('.js-player-wrapper')
    let image = current.querySelector('.item-content-image')

    if (video != null) {
      // Is video
      if (!video.classList.contains('parsed')) {
        this.parseVideo(video)
      }
    } else if (image != null) {
      // Is image
      let imgTarget = $(current).find('img').attr('data-src')
      $(current).find('img').attr('src',imgTarget)
    }
  }

  lazyObserver () {
    // create config object: rootMargin and threshold
    // are two properties exposed by the interface
    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
    };

    // register the config object with an instance
    // of intersectionObserver
    let observer = new IntersectionObserver((entries, self) => {
      // iterate over each entry
      entries.forEach(entry => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if(entry.isIntersecting) {
          // custom function that copies the path to the img
          // from data-src to src
          this.preloadContent(entry.target);

          // // the image is now in place, stop watching
          self.unobserve(entry.target);
        }
      });
    }, config);

    const imgs = document.querySelectorAll('.answer');
    imgs.forEach(img => {
      observer.observe(img);
    });
  }

  init() {
    console.log('lazy load init');
    this.lazyObserver()
  }
}

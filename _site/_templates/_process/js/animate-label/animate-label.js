'use strict'


import {
    TimelineMax,
    TweenMax,
    CSSPlugin,
    Power0
} from "gsap/all";

// Ensure modules don't get dropped by tree-shaking
const activated = [
    TimelineMax,
    TweenMax,
    CSSPlugin,
    Power0
];
import ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

export default class AnimateLabelDual {
  constructor() {
    this.config = {

    }

  }

  scrollMagic () {

		var controller2 = new ScrollMagic.Controller();

    $('.loop').find('.why-label-right').each(function() {

      $(this).addClass('parsed')
      // build a scene
      let scene5 = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 250,
        triggerHook: 0.5
      })
      .setTween(TweenMax.from($(this), 0.6, {autoAlpha: 0, rotate: '-90', delay:0.1, ease: Power0.easeOut})) // trigger a TweenMax.to tween
      .addTo(controller2);

      let scene6 = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 250,
        triggerHook: 0.2,
        offset: 0
      })
      .setTween(TweenMax.to($(this), 0.6, {autoAlpha: 0, rotate: '90', delay:0.1, ease: Power0.easeOut}))
      .addTo(controller2);

    });

    $('.loop').find('.why-label-left').each(function() {

      let scene7 = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 250,
        triggerHook: 0.5
      })
      .setTween(TweenMax.from($(this), 0.6, {autoAlpha: 0, rotate: '90', delay:0.1, ease: Power0.easeOut})) // trigger a TweenMax.to tween
      .addTo(controller2);

      let scene8 = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 250,
        triggerHook: 0.2,
        offset: 0
      })
      .setTween(TweenMax.to($(this), 0.6, {autoAlpha: 0, rotate: '-90', delay:0.1, ease: Power0.easeOut}))
      .addTo(controller2);

    });

  }

  scrollMagicFix () {
    // TEST PARA ELIMINAR EL WARNING

		// var controller2 = new ScrollMagic.Controller();

    let controllers = []
    $('.loop').find('.why-label-right').each(function(i) {
      console.log('index',i);
      let cont = new ScrollMagic.Controller();
      controllers.push (cont)

      $(this).addClass('parsed')
      // build a scene
      var scene1 = new ScrollMagic.Scene({
              triggerElement: this,
              offset: 10,
              duration: 30
          })
          .setTween(TweenMax.fromTo($(this), 0.2, {opacity: 0}, {opacity: 1}))
          .addTo(controllers[i]);

      var scene2 = new ScrollMagic.Scene({
              triggerElement: this,
              offset: 100,
              duration: 30
          })
          .setTween(TweenMax.fromTo($(this), 0.2, {opacity: 1}, {opacity: 0, immediateRender: false}))
          .addTo(controllers[i]);
      //
      // let scene6 = new ScrollMagic.Scene({
      //   triggerElement: this,
      //   duration: 250,
      //   triggerHook: 0.2,
      //   offset: 0
      // })
      // .on('start', (e) => {
      //   console.log('start');
      //   // TweenMax.to($(this), 0.6, {autoAlpha: 0, rotate: '90', delay:0.1, ease: Power0.easeOut})
      //   TweenMax.to($(this), 0.2, {rotate: e.scrollDirection === "FORWARD" ? 90 : -90});
      // })
      // .addTo(controller2);

    });

  }

  init() {

    requestAnimationFrame(() => this.scrollMagic());

  }
}

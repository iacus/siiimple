'use strict'

export default class Cursor {
  constructor() {
    this.config = {
      speed: .4,
      scaleMin:.3,
      scaleMax:1
    }
    this.ball = document.querySelector(".cursor")
  }

  mouseMoveRAF() {
    const ball = this.ball
    let mouseX = 0
    let mouseY = 0

    let ballX = 0
    let ballY = 0

    let speed = this.config.speed

    function animate() {
      let distX = mouseX - ballX
      let distY = mouseY - ballY

      ballX = ballX + (distX * speed)
      ballY = ballY + (distY * speed)

      ball.style.left = ballX + "px"
      ball.style.top = ballY + "px"

      requestAnimationFrame(animate)
    }

    animate()

    document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX
      mouseY = event.clientY
    })
    
  }

  mouseOversRAF () {
    const ball = this.ball

    let scaleMin = this.config.scaleMin
    let scaleMax = this.config.scaleMax

    let scale = 1 //Este valor va cambiando con el evento mouseover/mouseout

    function animate() {
      ball.style.transform = "scale("+scale+")"

      if (scale < scaleMax) {
        ball.classList.add('active')
      } else {
        ball.classList.remove('active')
      }

      requestAnimationFrame(animate)
    }

    animate()

    $('a').on('mouseover', function (event) {
      scale = scaleMin
    })
    $('a').on('mouseout', function (event) {
      scale = scaleMax
    })
    $('button').on('mouseover', function (event) {
      scale = scaleMin
    })
    $('button').on('mouseout', function (event) {
      scale = scaleMax
    })

  }

  init() {

    if (this.ball) {
      $('html').addClass('cursor-activated')
      this.mouseMoveRAF()
      this.mouseOversRAF()
    }


  }
}

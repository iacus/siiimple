'use strict'

export default class Debug {
  constructor () {
    this.config = {
      DEBUG: false
    }
  }
  debugControl () {
    if (!this.config.DEBUG) {
      this.addCredits()
      if (!window.console) window.console = {}
      var methods = ['log', 'debug', 'warn', 'info']
      for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {}
      }
    }
  }
  addCredits () {
    console.log('\n\n Design by KinderGarten', 'http://somoskindergarten.com', '\n\n')
    console.log('\n\n Code by Iago Barreiro', 'https://iagobarreiro.com', '\n\n')
  }
  init () {
    this.debugControl()
  }
}

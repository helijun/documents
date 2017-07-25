/* global $:true */
+ function($) {
  "use strict";
  var Slider = function (container, arg) {
    this.container = $(container);
    this.handler = this.container.find('.slider-active-btn')
    this.track = this.container.find('.slider-rel-plan')
    this.per = 0;
    this.bind()
    if (typeof arg === 'function') {
      this.callback = arg
    }
  }

  Slider.prototype.bind = function () {
    this.container
      .on($.touchEvents.start, $.proxy(this.touchStart, this))
      .on($.touchEvents.end, $.proxy(this.touchEnd, this));
    $(document.body)
    .on($.touchEvents.move, $.proxy(this.touchMove, this))
  }

  Slider.prototype.touchStart = function (e) {
    e.preventDefault()
    this.start = $.getTouchPosition(e)
    this.width = this.container.find('.slider-bg-plan').width()
    this.left = parseInt(this.container.find('.slider-active-btn').css('left'))
    this.touching = true
  }

  Slider.prototype.touchMove = function (e) {
    if (!this.touching) return true
    var p = $.getTouchPosition(e)
    var distance = p.x - this.start.x
    var left = distance + this.left
    var per = parseInt(left / this.width * 100)
    if (per < 0) per = 0
    if (per > 100) per = 100
    this.handler.css('left', per + '%')
    this.track.css('width', per + '%')
    this.per = per
    this.container.trigger('change', per)
  }

  Slider.prototype.touchEnd = function (e) {
    this.touching = false
    console.log('per',this.per)
    this.callback && this.callback(this.per)
  }

  $.fn.slider = function (arg) {
    this.each(function () {
      var $this = $(this)
      var slider = $this.data('slider')
      if (slider) return slider;
      else $this.data('slider', new Slider(this, arg))
    })
  }
}($);
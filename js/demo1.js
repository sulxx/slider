$(function() {
  var i = 0;
  var initial = [];
  $('#demo ul li').each(function() {
    $(this).css('left', 30 * i + 'px');
    initial[i] = 30 * i;
    i++;
  });
  $('#demo ul li div').click(function() {
    var clickIdx = $(this).parent().index();
    $('#demo ul li').each(function() {
      var thisIdx = $(this).index();
      if (thisIdx <= clickIdx)
        $(this).css('left', initial[thisIdx] + 'px');
      else
        $(this).css('left', initial[thisIdx] + 760 + 'px');
    });
  });

  //slide
  class slideControl {
    constructor(id) {
      this.container = $(id);
      this.items = this.container.find('li');
      this.handler = [];

      let my = this;
      let spot = $('#spot').find('li');
      spot.mouseenter(function() {
        var idx = $(this).index();
        my.slideTo(idx);
        my.stop();
      });
      spot.mouseleave(function() {
        my.start();
      });
      this.addHandler(function(curIdx, nextIdx) {
        spot.eq(curIdx).removeClass('slide_button-selected-control');
        spot.eq(nextIdx).addClass('slide_button-selected-control');
      });

      let leftArrow = $('#left-arrow'),
        rightArrow = $('#right-arrow');
      leftArrow.click(function() {
        my.slideNext();
      });
      rightArrow.click(function() {
        my.slidePre();
      });
    }
    getCurrentIdx() {     return this.items.filter('.slide-selected-item').index();
    }
    slideTo(nextIdx) {
      var curIdx = this.getCurrentIdx();
      this.items.eq(curIdx).removeClass('slide-selected-item');
      this.items.eq(nextIdx).addClass('slide-selected-item');
      this.handler.forEach(function(handler) {
        return handler(curIdx, nextIdx);
      });
    }
    slideNext() {
      var curIdx = this.getCurrentIdx();
      var nextIdx = (curIdx + 1) % this.items.length;
      this.items.eq(curIdx).removeClass('slide-selected-item');
      this.items.eq(nextIdx).addClass('slide-selected-item');
      this.handler.forEach(function(handler) {
        return handler(curIdx, nextIdx);
      });
    }
    slidePre() {
      var curIdx = this.getCurrentIdx();
      var nextIdx = (curIdx - 1 + this.items.length) % this.items.length;
      this.items.eq(curIdx).removeClass('slide-selected-item');
      this.items.eq(nextIdx).addClass('slide-selected-item');
      this.handler.forEach(function(handler) {
        return handler(curIdx, nextIdx);
      });
    }
    start() {
      this.stop();
      this.timer = setInterval(() => this.slideNext(), 5000);
    }
    stop() {
      if (this.timer !== null)
        clearInterval(this.timer);
    }
    addHandler(handler) {
      this.handler.push(handler);
    }
  }

  slider = new slideControl('#slide');
  //setInterval(slider.slideNext.bind(slider), 5000); //必须要用bind
  slider.start();
});

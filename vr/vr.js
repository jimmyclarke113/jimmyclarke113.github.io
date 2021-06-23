AFRAME.registerComponent('grip-button-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('abuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
    });
  }
});

AFRAME.registerComponent('grip-button-listener', {
  init: function () {
    var el = this.el;
    var sword = this.el.querySelector('#sword')
    el.addEventListener('gripdown', function (evt) {
      sword.setAttribute('visible', !sword.getAttribute('visible'));
    });
  }
});

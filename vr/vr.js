AFRAME.registerComponent('grip-button-listener', {
  init: function () {
    var el = this.el;
    var sword = this.querySelector('#redBox')
    el.addEventListener('abuttondown', function (evt) {
      sword.setAttribute('visible', !sword.getAttribute('visible'));
    });
  }
});

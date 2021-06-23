AFRAME.registerComponent('grip-button-listener', {
  init: function () {
    var sceneEl = document.querySelector('a-scene');
    var el = this.el;
    var sword = this.querySelector('#sword')
    el.addEventListener('abuttondown', function (evt) {
      sword.setAttribute('visible', !sword.getAttribute('visible'));
    });
  }
});

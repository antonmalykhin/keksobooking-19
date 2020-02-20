'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');

  var advertsData = window.data.generateAdverts(8);

  /**
 * Функция нажатия на главный маркер левой кнопкой мыши
 * @param {*} evt - Event
 */
  var onMainPinClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_BUTTON) {
      activatePage();
      window.map.renderMapPins(advertsData);
    }
  };

  /**
   * Функция нажатия на главный маркер клавишей Enter
   * @param {*} evt - Event
   */
  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.data.Keys.ENTER) {
      activatePage();
      window.map.renderMapPins(advertsData);
    }
  };

  /**
   * Функция активации карты и формы
   */
  var activatePage = function () {
    map.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    window.form.activateForm();
  };

  mainPin.addEventListener('mousedown', onMainPinClick);

  mainPin.addEventListener('keydown', onMainPinEnterPress);
})();

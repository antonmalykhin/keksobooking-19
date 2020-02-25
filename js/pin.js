'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');

  /**
   * Функция нажатия на главный маркер левой кнопкой мыши
   * @param {*} evt - Event
   */
  var onMainPinClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_BUTTON) {
      activatePage();
      window.load(window.map.renderMapPins);
    }
  };
  /**
   * Функция перемещения главного пина
   * @param {*} evt -Event
   */
  var onMainPinMove = function (evt) {

    var pinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Функция реализует изменения координат главного пина в зависимости от координат мыши
     * @param {*} moveEvt - Event
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: pinCoords.x - moveEvt.clientX,
        y: pinCoords.y - moveEvt.clientY
      };

      pinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (pinPosition.y < window.data.PinPositionY.MIN - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y) {
        pinPosition.y = window.data.PinPositionY.MIN - (window.data.PIN_HEIGHT - window.data.PIN_OFFSET_Y);
      } else if (pinPosition.y > window.data.PinPositionY.MAX - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y) {
        pinPosition.y = window.data.PinPositionY.MAX - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y;
      } else if (pinPosition.x < -mainPin.offsetWidth / 2) {
        pinPosition.x = -mainPin.offsetWidth / 2;
      } else if (pinPosition.x > map.offsetWidth - mainPin.offsetWidth / 2) {
        pinPosition.x = map.offsetWidth - mainPin.offsetWidth / 2;
      }

      mainPin.style.top = pinPosition.y + 'px';
      mainPin.style.left = pinPosition.x + 'px';
    };

    /**
     * Функция отпускания кнопки мыши
     * @param {*} upEvt - Event
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.changeAddressField();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  /**
   * Функция нажатия на главный маркер клавишей Enter
   * @param {*} evt - Event
   */
  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.data.Keys.ENTER) {
      activatePage();
      window.load(window.map.renderMapPins);
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

  mainPin.addEventListener('mousedown', onMainPinMove);

})();

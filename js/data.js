'use strict';

(function () {
  /**
   * Клик по левой кнопке мыши
   * @constant
   * @type {number}
   */
  var LEFT_MOUSE_BUTTON = 0;

  /**
   * Кнопки клавиатуры
   * @constant
   * @type {*}
   */
  var Keys = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

  /**
   * Минимальное и максимальное значения положения маркера по оси Y
   * @constant
   */
  var PinPositionY = {
    MIN: 130,
    MAX: 630
  };

  /**
   * Минимальные цены жилья
   * @constant
   * @type {object}
   */
  var MinPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
   * Комнаты
   * @constant
   * @type {object}
   */
  var Rooms = {
    1: 1,
    2: 2,
    3: 3,
    100: 0
  };

  var PIN_HEIGHT = 78;

  var PIN_ELEMENT_HEIGHT = 13;

  var PIN_OFFSET_Y = 60;

  window.data = {
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    Keys: Keys,
    PIN_HEIGHT: PIN_HEIGHT,
    PinPositionY: PinPositionY,
    MinPrices: MinPrices,
    Rooms: Rooms,
    PIN_ELEMENT_HEIGHT: PIN_ELEMENT_HEIGHT,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
  };
})();

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
   * Типы жилья
   * @constant
   * @type {array}
   */
  var HOST_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  /**
    * Преимущества
    * @constant
    * @type {array}
    */
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  /**
   * Минимальное и максимальное значения положения маркера по оси Y
   * @constant
   */
  var PinPositionY = {
    MIN: 130,
    MAX: 630
  };

  /**
   * Время
   * @constant
   * @type {array}
   */
  var TIME_PERIODS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  /**
   * Заголовок объявления
   * @constant
   * @type {string}
   */
  var ADVERT_TITLE = 'Заголовок предложения';

  /**
   * Максимальная цена
   * @constant
   * @type {number}
   */
  var MAX_PRICE = 10000;

  /**
   * Количесво комнат
   * @constant
   * @type {number}
   */
  var ROOMS_QUANTITY = 10;

  /**
   * Количесво гостей
   * @constant
   * @type {number}
   */
  var GUESTS_QUANTITY = 10;

  /**
   * Описание объявления
   * @constant
   * @type {string}
   */
  var DESCRIPTION = 'строка с описанием';

  /**
   * Фотографии жилья
   * @constant
   * @type {array}
   */
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  /**
   * Ширина маркера
   * @constant
   * @type {number}
   */
  var PIN_WIDTH = 50;

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

  window.data = {
    Keys: Keys,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    HOST_TYPES: HOST_TYPES,
    FEATURES: FEATURES,
    PinPositionY: PinPositionY,
    TIME_PERIODS: TIME_PERIODS,
    ADVERT_TITLE: ADVERT_TITLE,
    MAX_PRICE: MAX_PRICE,
    ROOMS_QUANTITY: ROOMS_QUANTITY,
    GUESTS_QUANTITY: GUESTS_QUANTITY,
    DESCRIPTION: DESCRIPTION,
    PHOTOS: PHOTOS,
    PIN_WIDTH: PIN_WIDTH,
    MinPrices: MinPrices,
    Rooms: Rooms
  };
})();

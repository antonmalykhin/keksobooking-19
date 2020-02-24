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

  var PIN_HEIGHT = 78;

  var PIN_ELEMENT_HEIGHT = 13;

  var PIN_OFFSET_Y = 60;


  var map = document.querySelector('.map');

  /**
   * Функция генерации предложения
   * @param {number} index
   * @return {object}
   *
   */
  var getAdvertData = function (index) {

    var advertData = {};

    var xPosition = window.utils.getRandomNumber(PIN_WIDTH / 2, map.clientWidth - PIN_WIDTH / 2);
    var yPosition = window.utils.getRandomNumber(PinPositionY.MIN, PinPositionY.MAX);
    advertData.author = {avatar: 'img/avatars/user0' + (index + 1) + '.png'};
    advertData.offer = {
      title: ADVERT_TITLE,
      address: xPosition + ', ' + yPosition,
      price: window.utils.getRandomNumber(MAX_PRICE),
      type: window.utils.getRandomValueFromArray(HOST_TYPES),
      rooms: window.utils.getRandomNumber(ROOMS_QUANTITY),
      guests: window.utils.getRandomNumber(GUESTS_QUANTITY),
      checkin: window.utils.getRandomValueFromArray(TIME_PERIODS),
      checkout: window.utils.getRandomValueFromArray(TIME_PERIODS),
      features: window.utils.getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: window.utils.getRandomArray(PHOTOS),
    };

    advertData.location = {
      x: xPosition,
      y: yPosition
    };

    return advertData;
  };

  /**
   *  Функуия генерации предложений
   * @param {number} quantityAdverts - количество генерируемых предложений
   * @return {array}
   */
  var generateAdverts = function (quantityAdverts) {
    var adverts = [];
    for (var i = 0; i < quantityAdverts; i++) {
      adverts.push(getAdvertData(i));
    }
    return adverts;
  };

  window.data = {
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    Keys: Keys,
    PIN_HEIGHT: PIN_HEIGHT,
    PinPositionY: PinPositionY,
    MinPrices: MinPrices,
    Rooms: Rooms,
    PIN_ELEMENT_HEIGHT: PIN_ELEMENT_HEIGHT,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    generateAdverts: generateAdverts
  };
})();

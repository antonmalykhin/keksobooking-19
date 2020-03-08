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

  /**
   * Высота пина
   * @constant
   * @type {number}
   */
  var PIN_HEIGHT = 78;

  /**
   * Высота элемента-указателя пина
   * @constant
   * @type {number}
   */
  var PIN_ELEMENT_HEIGHT = 13;

  /**
   * Поправка координаты по оси Y пина
   * @constant
   * @type {number}
   */
  var PIN_OFFSET_Y = 60;

  /**
   * Дефолтные координаты пина
   * @constant
   * @type {object}
   */
  var MainPinDefaultPosition = {
    TOP: '375px',
    LEFT: '570px'
  };

  /**
   * Коды ответа сервера
   * @constant
   * @type {object}
   */
  var StatusCodes = {
    OK: 200
  };

  /**
   * Длинна таймаута
   * @constant
   * @type {number}
   */
  var TIMEOUT = 10000;

  /**
   * url для загрузки данных с сервера
   * @constant
   * @type {string}
   */
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  /**
   * url для загрузки данных на сервера
   * @constant
   * @type {string}
   */
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  /**
   * Интервал задержки обновления
   * @constant
   * @type {number}
   */
  var DEBOUNCE_INTERVAL = 1000;
  /**
   * Типы файлов изображений
   * @constant
   * @type {array}
   */
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';

  /**
   * Объект параметров изображения жилья
   * @constant
   * @type {object}
   */
  var HousePreviewElement = {
    HOUSE_ELEMENT_TYPE: 'img',
    HOUSE_ELEMENT_ALT: 'Изображение жилья',
    HOUSE_ELEMENT_WIDTH: '70px',
    HOUSE_ELEMENT_HEIGHT: '70px'
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
    StatusCodes: StatusCodes,
    TIMEOUT: TIMEOUT,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    MainPinDefaultPosition: MainPinDefaultPosition,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    FILE_TYPES: FILE_TYPES,
    DEFAULT_AVATAR_IMG: DEFAULT_AVATAR_IMG,
    HousePreviewElement: HousePreviewElement
  };
})();

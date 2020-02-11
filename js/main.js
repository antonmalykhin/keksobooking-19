'use strict';

/**
 * Клик по левой кнопке мыши
 * @constant
 * @type {number}
 */
var LEFT_MOUSE_BUTTON = 0;

/**
 * Кнопка Enter на клавиатуре
 * @constant
 * @type {string}
 */
var ENTER = 'Enter';

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
var pinPositionY = {
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

var tempData = {
  /**
   * Заголовок объявления
   * @constant
   * @type {string}
   */
  ADVERT_TITLE: 'Заголовок предложения',

  /**
   * Максимальная цена
   * @constant
   * @type {number}
   */
  MAX_PRICE: 10000,

  /**
   * Количесво комнат
   * @constant
   * @type {number}
   */
  ROOMS_QUANTITY: 10,

  /**
   * Количесво гостей
   * @constant
   * @type {number}
   */
  GUESTS_QUANTITY: 10,

  /**
   * Описание объявления
   * @constant
   * @type {string}
   */
  DESCRIPTION: 'строка с описанием',

  /**
   * Фотографии жилья
   * @constant
   * @type {array}
   */
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

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
var MIN_PRICES = {
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

var rooms = {
  1: {
    ROOM_VALUE: 1,
    DISABLED_CAPACITY: [0, 1, 3]
  },
  2: {
    ROOM_VALUE: 2,
    DISABLED_CAPACITY: [0, 3]
  },
  3: {
    ROOM_VALUE: 3,
    DISABLED_CAPACITY: [3]
  },
  100: {
    ROOM_VALUE: 0,
    DISABLED_CAPACITY: [0, 1, 2]
  }
};

/**
 * Функция поиска случайного числа в заданном интервале. Если задан 1 аргумент, функция * возвращает случайное число от 0 до переданного значения аргумента
 * @param {number} minNumber - минимальное значение
 * @param {number} maxNumber - максимальное значение
 * @return {number}
 * @example
 *
 * getRandomNumberFormInterval(50, 100);
 * // => 63
 */
var getRandomNumber = function (minNumber, maxNumber) {
  minNumber = typeof minNumber === 'number' ? minNumber : 0;
  maxNumber = typeof maxNumber === 'number' ? maxNumber : 1000;
  return arguments.length > 1 ? Math.round(minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1)) : Math.round(Math.random() * minNumber);
};

/**
 * Функция поиска случайного значения массива
 * @param {array} values - массив значений
 * @return {*}
 * @example
 *
 * getRandomValueFromArray(['a', 'b', 'c', 'd'])
 * // => 'c'
 */
var getRandomValueFromArray = function (values) {
  return values[getRandomNumber(values.length - 1)];
};

/**
 * Функция генерации нового массива случайной длинны из случайных значений заданного массива
 * @param {array} array - Заданный массив
 * @return {array}
 * @example
 *
 * getRandomArray(['a', 'b', 'c', 'd', 'c'])
 * // => ['b', 'd', 'a']
 */
var getRandomArray = function (array) {
  var newArray = [];

  for (var i = 0; i <= array.length; i++) {
    var item = array[getRandomNumber(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  }
  return newArray;
};

/**
 * Функция генерации массива объектов объявлений
 * @param {number} advertQuantity - количество генерируемых объектов
 * @return {array}
 *
 */

var getAdvertsData = function (advertQuantity) {
  var adverts = [];

  for (var i = 1; i <= advertQuantity; i++) {
    var obj = {};
    var xPosition = getRandomNumber(PIN_WIDTH / 2, map.clientWidth - PIN_WIDTH / 2);
    var yPosition = getRandomNumber(pinPositionY.MIN, pinPositionY.MAX);
    obj.author = {avatar: 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      title: tempData.ADVERT_TITLE,
      address: xPosition + ', ' + yPosition,
      price: getRandomNumber(tempData.MAX_PRICE),
      type: getRandomValueFromArray(HOST_TYPES),
      rooms: getRandomNumber(tempData.ROOMS_QUANTITY),
      guests: getRandomNumber(tempData.GUESTS_QUANTITY),
      checkin: getRandomValueFromArray(TIME_PERIODS),
      checkout: getRandomValueFromArray(TIME_PERIODS),
      features: getRandomArray(FEATURES),
      description: tempData.DESCRIPTION,
      photos: getRandomArray(tempData.PHOTOS),
    };

    obj.location = {
      x: xPosition,
      y: yPosition
    };
    adverts.push(obj);
  }

  return adverts;
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var advertForm = document.querySelector('.ad-form');

var advertFields = {
  priceField: advertForm.querySelector('#price'),
  addressField: advertForm.querySelector('#address'),
  checkinField: advertForm.querySelector('#timein'),
  checkoutField: advertForm.querySelector('#timeout'),
  roomsField: advertForm.querySelector('#room_number'),
  capacityField: advertForm.querySelector('#capacity'),
  typeField: advertForm.querySelector('#type')
};

// /**
//  * Функция добавления атрибута минимального значения цены в зависимости от типа жилья
//  */
var onTypeInputChange = function (evt) {
  advertFields.priceField.setAttribute('min', MIN_PRICES[evt.target.value]);
};

advertFields.typeField.addEventListener('change', onTypeInputChange);

/**
 * Функция смены количества мест в зависимости от количества выбранных комнат
 * @param {*} evt - event
 */
var onRoomFieldClick = function (evt) {

  advertFields.capacityField.querySelectorAll('option').forEach(function (option) {
    option.disabled = false;
  });

  advertFields.capacityField.value = advertFields.roomsField.value;
  rooms[evt.target.value].DISABLED_CAPACITY.forEach(function (capacity) {
    advertFields.capacityField.options.item(capacity).disabled = true;
  });

  advertFields.capacityField.value = rooms[evt.target.value].ROOM_VALUE;
};

advertFields.roomsField.addEventListener('click', onRoomFieldClick);

advertFields.checkinField.addEventListener('change', function () {
  advertFields.checkoutField.value = advertFields.checkinField.value;
});

advertFields.checkoutField.addEventListener('change', function () {
  advertFields.checkinField.value = advertFields.checkoutField.value;
});

advertFields.addressField.value = (mainPin.offsetTop + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetLeft + mainPin.scrollHeight);


/**
 * Функция активации полей формы объявления
 */
var activateForm = function () {
  advertForm.querySelectorAll('fieldset').forEach(function (fieldset) {
    fieldset.disabled = false;
  });

  advertFields.capacityField.value = advertFields.roomsField.value;
};

/**
 * Функция активации карты и формы
 */
var activatePage = function () {
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  mainPin.removeEventListener('mousedown', onMainPinClick);
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
  activateForm();
};

/**
 * Функция нажатия на главный маркер левой кнопкой мыши
 * @param {*} evt - Event
 */
var onMainPinClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage();
  }
};

/**
 * Функция нажатия на главный маркер клавишей Enter
 * @param {*} evt - Event
 */
var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER) {
    activatePage();
  }
};

mainPin.addEventListener('mousedown', onMainPinClick);

mainPin.addEventListener('keydown', onMainPinEnterPress);

/**
 * Функция рисует маркеры объявления из из массива объектов объявлений
 * @param {*} adverts - Массив объектов объявлений
 */
var renderMapPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  adverts.forEach(function (advert, i) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    fragment.appendChild(pin);
    pin.addEventListener('click', function () {
      renderCard(adverts[i]);
    });
  });
  mapPins.appendChild(fragment);
};

/**
 * Функция отображения окна объявления
 * @param {object} advert - Объектов объявления
 */
var renderCard = function (advert) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = advert.author.avatar;
  card.querySelector('.popup__title').innerText = advert.offer.title;
  card.querySelector('.popup__text--address').innerText = advert.offer.address;
  card.querySelector('.popup__text--price').innerText = advert.offer.price + '₽/ночь';
  card.querySelector('.popup__type').innerText = advert.offer.type;
  card.querySelector('.popup__text--capacity').innerText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  card.querySelector('.popup__description').innerText = advert.offer.description;

  var featuresList = card.querySelector('.popup__features');
  var features = featuresList.querySelectorAll('.popup__feature');

  features.forEach(function (feature) {
    var f = featuresList.removeChild(feature);
    advert.offer.features.forEach(function (offerFeature) {
      if (f.classList.value.includes(offerFeature)) {
        featuresList.appendChild(f);
      }
    });
  });

  var photos = card.querySelector('.popup__photos');

  if (advert.offer.photos) {
    var photo = photos.removeChild(photos.querySelector('.popup__photo'));
    advert.offer.photos.forEach(function (photoItem) {
      var photoCopy = photo.cloneNode();
      photoCopy.src = photoItem;
      photos.appendChild(photoCopy);
    });
    card.appendChild(photos);
  } else {
    card.removeChild(photos);
  }

  map.insertBefore(card, map.querySelector('.map__filters-container'));
};

var advertsData = getAdvertsData(8);
renderMapPins(advertsData);



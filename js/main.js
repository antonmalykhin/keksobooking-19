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


var TEMP_DATA = {
  /**
   * Заголовок объявления
   * @constant
   * @type {string}
   */
  advertTitle: 'Заголовок предложения',

  /**
   * Максимальная цена
   * @constant
   * @type {number}
   */
  maxPrice: 10000,

  /**
   * Количесво комнат
   * @constant
   * @type {number}
   */
  roomsQuantity: 10,

  /**
   * Количесво гостей
   * @constant
   * @type {number}
   */
  guestsQuantity: 10,

  /**
   * Описание объявления
   * @constant
   * @type {string}
   */
  description: 'строка с описанием',

  /**
   * Типы жилья
   * @constant
   * @type {array}
   */
  hostTypes: ['palace', 'flat', 'house', 'bungalo'],

  /**
   * Время
   * @constant
   * @type {array}
   */
  timePeriods: ['12:00', '13:00', '14:00'],

  /**
   * Преимущества
   * @constant
   * @type {array}
   */
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

  /**
   * Фотографии жилья
   * @constant
   * @type {array}
   */
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  /**
   * Минимальное и максимальное значения положения маркера по оси Х
   * @constant
   */
  y: {
    min: 130,
    max: 630
  }
};

/**
 * Ширина маркера
 * @constant
 * @type {number}
 */
var PIN_WIDTH = 50;

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
 */
var getAdvertsData = function (advertQuantity) {
  var adverts = [];

  for (var i = 1; i <= advertQuantity; i++) {
    var obj = {};
    var xPosition = getRandomNumber(PIN_WIDTH / 2, map.clientWidth - PIN_WIDTH / 2);
    var yPosition = getRandomNumber(TEMP_DATA.y.min, TEMP_DATA.y.max);
    obj.author = {avatar: 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      title: TEMP_DATA.advertTitle,
      address: xPosition + ', ' + yPosition,
      price: getRandomNumber(TEMP_DATA.maxPrice),
      type: getRandomValueFromArray(TEMP_DATA.hostTypes),
      rooms: getRandomNumber(TEMP_DATA.roomsQuantity),
      guests: getRandomNumber(TEMP_DATA.guestsQuantity),
      checkin: getRandomValueFromArray(TEMP_DATA.timePeriods),
      checkout: getRandomValueFromArray(TEMP_DATA.timePeriods),
      features: getRandomArray(TEMP_DATA.features),
      description: TEMP_DATA.description,
      photos: getRandomArray(TEMP_DATA.photos),
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
var priceField = advertForm.querySelector('#price');
var addressField = advertForm.querySelector('#address');
var checkinField = advertForm.querySelector('#timein');
var checkoutField = advertForm.querySelector('#timeout');
var roomsField = advertForm.querySelector('#room_number');
var capacityField = advertForm.querySelector('#capacity');
var typeField = advertForm.querySelector('#type');


/**
 * Функция добавления атрибута минимального значения цены в зависимости от типа жилья
 */
var onTypeInputChange = function () {
  var minPrice;

  switch (typeField.value) {
    case 'bungalo':
      minPrice = 0;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
  }

  priceField.setAttribute('min', minPrice);
};

typeField.addEventListener('change', onTypeInputChange);

/**
 * Функция добавления атрибута disabled option
 * @param {*} select - select
 */
var makeDisableOptions = function (select) {
  for (var i = 0; i < select.options.length; i++) {
    select.options[i].setAttribute('disabled', '');
  }
};

/**
 * Функция удаления атрибута disabled
 * @param {*} select - select
 * @param {*} value - значение
 */
var makeEnableOptions = function (select, value) {
  for (var i = value - 1; i >= 0; i--) {
    select.options[2 - i].removeAttribute('disabled');
  }
};

/**
 * Функция синхронизации полей количества комнат и количества гостей
 */
var onRoomsInputClick = function () {
  makeDisableOptions(capacityField);
  switch (roomsField.value) {
    case '1':
      makeEnableOptions(capacityField, roomsField.value);
      break;
    case '2':
      makeEnableOptions(capacityField, roomsField.value);
      break;
    case '3':
      makeEnableOptions(capacityField, roomsField.value);
      break;
    case '100':
      capacityField.options[3].removeAttribute('disabled');
      break;
  }
};

capacityField.options[2].setAttribute('selected', '');

roomsField.addEventListener('click', onRoomsInputClick);

checkinField.addEventListener('change', function () {
  checkoutField.value = checkinField.value;
});

checkoutField.addEventListener('change', function () {
  checkinField.value = checkoutField.value;
});

addressField.value = (mainPin.offsetTop + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetLeft + mainPin.scrollHeight);

/**
 * Функция активации карты и формы
 */
var activate = function () {
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
};

/**
 * Функция нажатия на главный маркер левой кнопкой мыши
 * @param {*} evt - Event
 */
var onMainPinClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activate();
  }
};

/**
 * Функция нажатия на главный маркер клавишей Enter
 * @param {*} evt - Event
 */
var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER) {
    activate();
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
  adverts.forEach(function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    fragment.appendChild(pin);
  });
  mapPins.appendChild(fragment);
};

/**
 * Функция отображения окна объявления
 * @param {object} advert - Объектов объявления
 */
var renderCard = function (advert) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

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
    if (!(advert.offer.features.includes(feature.classList[1].split('--')[1]))) {
      featuresList.removeChild(feature);
    }
  });

  var photos = card.querySelector('.popup__photos');
  var photo = photos.removeChild(photos.querySelector('.popup__photo'));

  advert.offer.photos.forEach(function (photoItem) {
    var photoCopy = photo.cloneNode();
    photoCopy.src = photoItem;
    photos.appendChild(photoCopy);
  });

  card.appendChild(photos);

  fragment.appendChild(card);


  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};

var advertsData = getAdvertsData(8);
renderMapPins(advertsData);
renderCard(advertsData[3]);



'use strict';

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

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var advertForm = document.querySelector('.ad-form');
var formFields = advertForm.querySelectorAll('fieldset');
var priceField = advertForm.querySelector('#price');
var addressField = advertForm.querySelector('#address');
var checkinField = advertForm.querySelector('#timein');
var checkoutField = advertForm.querySelector('#timeout');
var roomsField = advertForm.querySelector('#room_number');
var capacityField = advertForm.querySelector('#capacity');
var capacities = capacityField.querySelectorAll('option');
var typeField = advertForm.querySelector('#type');

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
 * Функция генерации предложения
 * @param {number} index
 * @return {object}
 *
 */
var getAdvertData = function (index) {

  var advertData = {};

  var xPosition = getRandomNumber(PIN_WIDTH / 2, map.clientWidth - PIN_WIDTH / 2);
  var yPosition = getRandomNumber(PinPositionY.MIN, PinPositionY.MAX);
  advertData.author = {avatar: 'img/avatars/user0' + (index + 1) + '.png'};
  advertData.offer = {
    title: ADVERT_TITLE,
    address: xPosition + ', ' + yPosition,
    price: getRandomNumber(MAX_PRICE),
    type: getRandomValueFromArray(HOST_TYPES),
    rooms: getRandomNumber(ROOMS_QUANTITY),
    guests: getRandomNumber(GUESTS_QUANTITY),
    checkin: getRandomValueFromArray(TIME_PERIODS),
    checkout: getRandomValueFromArray(TIME_PERIODS),
    features: getRandomArray(FEATURES),
    description: DESCRIPTION,
    photos: getRandomArray(PHOTOS),
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

/**
 * Функция добавления атрибута минимального значения цены в зависимости от типа жилья
 * @param {*} evt - event
 */
var onTypeInputChange = function (evt) {
  priceField.setAttribute('min', MinPrices[evt.target.value]);
  priceField.setAttribute('placeholder', MinPrices[evt.target.value]);
};

/**
 * Функция устанавливает пункты селекта в неактивное состояние
 * @param {*} fields - коллекция HTML-объектов;
 */
var makeFieldsDisabled = function (fields) {
  fields.forEach(function (field) {
    field.disabled = true;
  });
};

/**
 * Функция проверки доступности вариантов выбора количества мест
 * @param {*} options - коллекция HTML-объектов
 * @param {*} roomIndex - ключ
 */
var checkRooms = function (options, roomIndex) {
  if (roomIndex === 0) {
    options[3].disabled = false;
  } else {
    for (var i = roomIndex; i > 0; i--) {
      options.forEach(function (capacity) {
        if (parseInt(capacity.value, 10) === i) {
          capacity.disabled = false;
        }
      });
    }
  }
};

/**
 * Функция смены количества мест в зависимости от количества выбранных комнат
 * @param {*} evt - event
 */
var onRoomFieldClick = function (evt) {
  makeFieldsDisabled(capacities);

  checkRooms(capacities, Rooms[evt.target.value]);

  capacityField.value = Rooms[evt.target.value];
};

/**
 * Функция активации полей формы объявления
 */
var activateForm = function () {
  advertForm.querySelectorAll('fieldset').forEach(function (fieldset) {
    fieldset.disabled = false;
  });

  capacityField.value = roomsField.value;
  makeFieldsDisabled(capacities);
  checkRooms(capacities, parseInt(roomsField.value, 10));

  priceField.setAttribute('placeholder', MinPrices[typeField.value]);
  addressField.value = (mainPin.offsetTop + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetLeft + mainPin.scrollHeight);
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
    renderMapPins(advertsData);
  }
};

/**
 * Функция нажатия на главный маркер клавишей Enter
 * @param {*} evt - Event
 */
var onMainPinEnterPress = function (evt) {
  if (evt.key === Keys.ENTER) {
    activatePage();
    renderMapPins(advertsData);
  }
};

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
    pin.addEventListener('click', function () {
      renderCard(advert);
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
    var featureItem = featuresList.removeChild(feature);
    advert.offer.features.forEach(function (offerFeature) {
      if (featureItem.classList.value.includes(offerFeature)) {
        featuresList.appendChild(featureItem);
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

  /**
   * Функция скрытия карточки объявления
   * @param {*} evt - Event
   */
  var onCloseCardBtnClick = function (evt) {
    if (evt.target.type === 'button') {
      map.removeChild(card);
      card.removeEventListener('click', onCloseCardBtnClick);
    }
  };

  /**
   * Функция скрытия карточки объявления по нажатию ESC
   * @param {*} evt - Event
   */
  var onEscapePress = function (evt) {
    if (evt.key === Keys.ESC) {
      map.removeChild(card);
      card.removeEventListener('click', onCloseCardBtnClick);
      window.removeEventListener('keydown', onEscapePress);
    }
  };

  card.addEventListener('click', onCloseCardBtnClick);
  window.addEventListener('keydown', onEscapePress);
};


typeField.addEventListener('change', onTypeInputChange);

makeFieldsDisabled(formFields);

roomsField.addEventListener('mouseup', onRoomFieldClick);

checkinField.addEventListener('change', function () {
  checkoutField.value = checkinField.value;
});

checkoutField.addEventListener('change', function () {
  checkinField.value = checkoutField.value;
});

var advertsData = generateAdverts(8);

mainPin.addEventListener('mousedown', onMainPinClick);

mainPin.addEventListener('keydown', onMainPinEnterPress);

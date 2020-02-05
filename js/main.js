'use strict';

var LEFT_MOUSE_BUTTON = 0;
var ENTER = 'Enter';
var TEMP_DATA = {
  advertTitle: 'Заголовок предложения',
  maxPrice: 10000,
  roomsQuantity: 10,
  guestsQuantity: 10,
  description: 'строка с описанием',
  hostTypes: ['palace', 'flat', 'house', 'bungalo'],
  timePeriods: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  y: {
    min: 130,
    max: 630
  }
};

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
var addressField = advertForm.querySelector('#address');
var checkinField = advertForm.querySelector('#timein');
var checkoutField = advertForm.querySelector('#timeout');

checkinField.addEventListener('change', function () {
  checkoutField.value = checkinField.value;
});

checkoutField.addEventListener('change', function () {
  checkinField.value = checkoutField.value;
});

addressField.value = (mainPin.offsetTop + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetLeft + mainPin.scrollHeight);


var activate = function () {
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
};

var onMainPinClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activate();
  }
};

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
// renderMapPins(advertsData);
// renderCard(advertsData[3]);



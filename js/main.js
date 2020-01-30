'use strict';

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
var getRandomNumberFromInterval = function (minNumber, maxNumber) {
  minNumber = typeof minNumber !== 'undefined' ? minNumber : 0;
  maxNumber = typeof maxNumber !== 'undefined' ? maxNumber : 1000;
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
  return values[getRandomNumberFromInterval(values.length - 1)];
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
    var item = array[getRandomNumberFromInterval(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  }
  return newArray;
};

/**
 * Функция генерации массива объектов объявлений
 * @param {number} objectsCounter - количество генерируемых объектов
 * @return {array}
 */
var getAdvertsData = function (objectsCounter) {
  var adverts = [];

  for (var i = 1; i <= objectsCounter; i++) {
    var obj = {};
    var xPosition = getRandomNumberFromInterval(55, map.clientWidth - 55);
    var yPosition = getRandomNumberFromInterval(130, 630);
    obj.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      'title': 'Заголовок предложения',
      'address': xPosition + ', ' + yPosition,
      'price': getRandomNumberFromInterval(10000),
      'type': getRandomValueFromArray(['palace', 'flat', 'house', 'bungalo']),
      'rooms': getRandomNumberFromInterval(10),
      'guests': getRandomNumberFromInterval(10),
      'checkin': getRandomValueFromArray(['12:00', '13:00', '14:00']),
      'checkout': getRandomValueFromArray(['12:00', '13:00', '14:00']),
      'features': getRandomArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
      'description': 'строка с описанием',
      'photos': getRandomArray(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']),
    };

    obj.location = {
      'x': xPosition,
      'y': yPosition
    };
    adverts.push(obj);
  }

  return adverts;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPins = map.querySelector('.map__pins');

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

var addvertsData = getAdvertsData(8);
renderMapPins(addvertsData);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (adverts) {
  var fragment = document.createDocumentFragment();
  var card = cardTemplate.cloneNode(true);

  adverts.forEach(function (advert) {
    card.querySelector('.popup__avatar').innerText = advert.author.avatar;
    card.querySelector('.popup__title').innerText = advert.offer.title;
    card.querySelector('.popup__text--address').innerText = advert.offer.address;
    card.querySelector('.popup__text--price').innerText = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').innerText = advert.offer.type;
    card.querySelector('.popup__text--capacity').innerText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    // card.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach(function (feature) {
    //   feature.classList.contains('popup__feature--' + advert.offer.feature) ? console.log('ok') : console.log('no');
    // // });
    // var ul = document.createElement('ul');
    // ul.classList.add('popup__features');
    // advert.offer.features.forEach(function (feature) {
    //   var li = document.createElement('li');
    //   li.classList.add('popup__feature');
    //   li.classList.add('popup__feature--' + feature);
    //   ul.appendChild(li);
    // });
    // card.appendChild(ul);

    fragment.appendChild(card);
  });
  mapPins.appendChild(fragment);
};


renderCard(addvertsData);



'use strict';

var map = document.querySelector('.map');

/**
 * Функция поиска случайного числа в заданном интервале
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @returns {number}
 * @example
 *
 * getRandomNumberFormInterval(50, 100);
 * // => 63
 */
var getRandomNumberFormInterval = function (minNumber=0, maxNumber=1000) {
  return Math.round(minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1));
}

/**
 * Функция поиска случайного числа от 0 до заданного
 * @param {number} max -максимального
 * @returns {number}
 * @example
 *
 * getRandomNumber(1000);
 * // => 537
 */
var getRandomNumber = function (max=1000) {
  return Math.round(Math.random() * max);
}

/**
 * Функция поиска случайного значения массива
 * @param {array} values - массив значений
 * @returns {*}
 * @example
 *
 * getRandomValueFromArray(['a', 'b', 'c', 'd'])
 * // => 'c'
 */
var getRandomValueFromArray = function (values) {
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Функция генерации нового массива случайной длинны из случайных значений заданного массива
 * @param {array} array - Заданный массив
 * @returns {array}
 * @example
 *
 * getRandomArray(['a', 'b', 'c', 'd', 'c'])
 * // => ['b', 'd', 'a']
 */
var getRandomArray = function (array) {
  var newArray = [];
  for (var i = 0; i <= getRandomNumber(array.length); i++) {
    var item = array[getRandomNumber(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    };
  }
  return newArray;
};

/**
 * Функция генерации массива объектов объявлений
 * @param {number} objectsCounter - количество генерируемых объектов
 * @returns {array}
 */
var getAddData = function (objectsCounter) {
  var array = [];

  for (var i = 1; i <= objectsCounter; i++) {
    var obj = {};
    obj.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      'title': 'заголовок предложения',
      'address': getRandomNumber() + ', ' + getRandomNumber(),
      'price': getRandomNumber(),
      'type':  getRandomValue(['palace', 'flat', 'house', 'bungalo']),
      'rooms': getRandomNumber(10),
      'guests': getRandomNumber(10),
      'checkin': getRandomValue(['12:00', '13:00', '14:00']),
      'checkout':  getRandomValue(['12:00', '13:00', '14:00']),
      'features': getRandomArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
      "description": 'строка с описанием',
      "photos": getRandomArray(["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]),
    };
    obj.location = {
      "x": getRandomNumber(map.clientWidth, map.clientHeight),
      "y": getRandomNumber(130, 630)
      }
    array.push(obj);
  }

  return array;
};

var x = getAddData(8);

console.dir(x);


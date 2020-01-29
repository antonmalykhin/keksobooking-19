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
  for (var i = 0; i <= getRandomNumberFromInterval(array.length); i++) {
    var item = array[getRandomNumberFromInterval(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  }
  return newArray;
};

var map = document.querySelector('.map');

/**
 * Функция генерации массива объектов объявлений
 * @param {number} objectsCounter - количество генерируемых объектов
 * @return {array}
 */
var getAdvertsData = function (objectsCounter) {
  var array = [];

  for (var i = 1; i <= objectsCounter; i++) {
    var obj = {};
    obj.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      'title': 'заголовок предложения',
      'address': getRandomNumberFromInterval(map.clientWidth, map.clientHeight) + ', ' + getRandomNumberFromInterval(130, 630),
      'price': getRandomNumberFromInterval(),
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
      'x': getRandomNumberFromInterval(map.clientWidth, map.clientHeight),
      'y': getRandomNumberFromInterval(130, 630)
    };
    array.push(obj);
  }

  return array;
};

var x = getAdvertsData(8);

console.dir(x);

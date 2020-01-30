'use strict';

<<<<<<< HEAD
var map = document.querySelector('.map');

/**
 * Функция поиска случайного числа в заданном интервале
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @returns {number}
=======
/**
 * Функция поиска случайного числа в заданном интервале. Если задан 1 аргумент, функция * возвращает случайное число от 0 до переданного значения аргумента
 * @param {number} minNumber - минимальное значение
 * @param {number} maxNumber - максимальное значение
 * @return {number}
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
 * @example
 *
 * getRandomNumberFormInterval(50, 100);
 * // => 63
 */
<<<<<<< HEAD
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
=======
var getRandomNumberFromInterval = function (minNumber, maxNumber) {
  minNumber = typeof minNumber !== 'undefined' ? minNumber : 0;
  maxNumber = typeof maxNumber !== 'undefined' ? maxNumber : 1000;
  return arguments.length > 1 ? Math.round(minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1)) : Math.round(Math.random() * minNumber);
};
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97

/**
 * Функция поиска случайного значения массива
 * @param {array} values - массив значений
<<<<<<< HEAD
 * @returns {*}
=======
 * @return {*}
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
 * @example
 *
 * getRandomValueFromArray(['a', 'b', 'c', 'd'])
 * // => 'c'
 */
var getRandomValueFromArray = function (values) {
<<<<<<< HEAD
  return values[Math.floor(Math.random() * values.length)];
}
=======
  return values[getRandomNumberFromInterval(values.length - 1)];
};
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97

/**
 * Функция генерации нового массива случайной длинны из случайных значений заданного массива
 * @param {array} array - Заданный массив
<<<<<<< HEAD
 * @returns {array}
=======
 * @return {array}
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
 * @example
 *
 * getRandomArray(['a', 'b', 'c', 'd', 'c'])
 * // => ['b', 'd', 'a']
 */
var getRandomArray = function (array) {
  var newArray = [];
<<<<<<< HEAD
  for (var i = 0; i <= getRandomNumber(array.length); i++) {
    var item = array[getRandomNumber(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    };
=======
  for (var i = 0; i <= getRandomNumberFromInterval(array.length); i++) {
    var item = array[getRandomNumberFromInterval(array.length - 1)];
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
  }
  return newArray;
};

<<<<<<< HEAD
/**
 * Функция генерации массива объектов объявлений
 * @param {number} objectsCounter - количество генерируемых объектов
 * @returns {array}
 */
var getAddData = function (objectsCounter) {
=======
var map = document.querySelector('.map');

/**
 * Функция генерации массива объектов объявлений
 * @param {number} objectsCounter - количество генерируемых объектов
 * @return {array}
 */
var getAdvertsData = function (objectsCounter) {
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
  var array = [];

  for (var i = 1; i <= objectsCounter; i++) {
    var obj = {};
    obj.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    obj.offer = {
      'title': 'заголовок предложения',
<<<<<<< HEAD
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
=======
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
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97
    array.push(obj);
  }

  return array;
};

<<<<<<< HEAD
var x = getAddData(8);

console.dir(x);

=======
var x = getAdvertsData(8);

console.dir(x);
>>>>>>> fc2a42148be032d59183938bb581b41331ffea97

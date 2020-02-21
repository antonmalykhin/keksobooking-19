'use strict';
(function () {

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
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomValueFromArray: getRandomValueFromArray,
    getRandomArray: getRandomArray,
  };
})();

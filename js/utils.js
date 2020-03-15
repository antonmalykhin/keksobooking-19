'use strict';
(function () {

  var getRandomNumber = function (minNumber, maxNumber) {
    return Math.round(minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1));
  };

  var getRandomValueFromArray = function (values) {
    return values[getRandomNumber(values.length - 1)];
  };

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

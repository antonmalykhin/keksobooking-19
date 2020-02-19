'use strict';

(function () {
  var map = document.querySelector('.map');

  /**
   * Функция генерации предложения
   * @param {number} index
   * @return {object}
   *
   */
  var getAdvertData = function (index) {

    var advertData = {};

    var xPosition = window.utils.getRandomNumber(window.data.PIN_WIDTH / 2, map.clientWidth - window.data.PIN_WIDTH / 2);
    var yPosition = window.utils.getRandomNumber(window.data.PinPositionY.MIN, window.data.PinPositionY.MAX);
    advertData.author = {avatar: 'img/avatars/user0' + (index + 1) + '.png'};
    advertData.offer = {
      title: window.data.ADVERT_TITLE,
      address: xPosition + ', ' + yPosition,
      price: window.utils.getRandomNumber(window.data.MAX_PRICE),
      type: window.utils.getRandomValueFromArray(window.data.HOST_TYPES),
      rooms: window.utils.getRandomNumber(window.data.ROOMS_QUANTITY),
      guests: window.utils.getRandomNumber(window.data.GUESTS_QUANTITY),
      checkin: window.utils.getRandomValueFromArray(window.data.TIME_PERIODS),
      checkout: window.utils.getRandomValueFromArray(window.data.TIME_PERIODS),
      features: window.utils.getRandomArray(window.data.FEATURES),
      description: window.data.DESCRIPTION,
      photos: window.utils.getRandomArray(window.data.PHOTOS),
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

  window.card = {
    generateAdverts: generateAdverts
  };
})();

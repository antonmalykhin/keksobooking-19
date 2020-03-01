'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var houseTypeField = mapFilter.querySelector('#housing-type');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Функция очистки карты от пинов
   */
  var clearMap = function () {
    var shownPins = mapPins.querySelectorAll('.map__pin');
    shownPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });
  };

  /**
   * Функция фильтрации отображаемых объявлений
   * @param {array} adverts - массив объектов объявлений
   */
  var filterAdverts = function (adverts) {

    var filteredAdverts = [];

    if (!(houseTypeField.value === 'any')) {
      filteredAdverts = adverts.filter(function (advert) {
        return houseTypeField.value === advert.offer.type;
      });
    } else {
      filteredAdverts = adverts;
    }

    window.map.renderMapPins(filteredAdverts);
  };

  /**
   * Функция изменения значения поля "Тип жилья" фильтра карты
   */
  var onHouseTypeFieldChange = function () {
    window.map.removeCards();
    window.load(filterAdverts);
    clearMap();
  };

  houseTypeField.addEventListener('change', onHouseTypeFieldChange);

})();

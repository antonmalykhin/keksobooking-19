'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var houseTypeField = mapFilter.querySelector('#housing-type');
  var housePriceField = mapFilter.querySelector('#housing-price');
  var houseRoomsField = mapFilter.querySelector('#housing-rooms');
  var houseGuestsField = mapFilter.querySelector('#housing-guests');
  var houseFeatures = mapFilter.querySelectorAll('.map__checkbox');
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
   * @return {arrya}
   */
  var filterByType = function (adverts) {

    var filteredAdverts = [];

    if (!(houseTypeField.value === 'any')) {
      filteredAdverts = adverts.filter(function (advert) {
        return houseTypeField.value === advert.offer.type;
      });
    } else {
      filteredAdverts = adverts;
    }
    return filteredAdverts;
  };

  /**
   * Функция фильтрации по стоимости жилья
   * @param {array} adverts
   * @return {array}
   */
  var filterByPrice = function (adverts) {

    var filteredAdverts = [];

    switch (housePriceField.value) {
      case 'middle':
        filteredAdverts = adverts.filter(function (advert) {
          return advert.offer.price < 50000 && advert.offer.price >= 10000;
        });
        break;
      case 'low':
        filteredAdverts = adverts.filter(function (advert) {
          return advert.offer.price < 10000;
        });
        break;
      case 'high':
        filteredAdverts = adverts.filter(function (advert) {
          return advert.offer.price > 50000;
        });
        break;
      default:
        filteredAdverts = adverts;
    }

    return filteredAdverts;
  };

  /**
   * Функция фильтрации по количеству комнат
   * @param {array} adverts
   * @return {array}
   */
  var filterByRooms = function (adverts) {
    var filteredAdverts = [];
    if (!(houseRoomsField.value === 'any')) {

      filteredAdverts = adverts.filter(function (advert) {
        return parseInt(houseRoomsField.value, 10) === advert.offer.rooms;
      });
    } else {
      filteredAdverts = adverts;
    }

    return filteredAdverts;
  };

  /**
   * Функция фильтрации по количеству гостей
   * @param {array} adverts
   * @return {array}
   */
  var filterByGuests = function (adverts) {
    var filteredAdverts = [];

    if (!(houseGuestsField.value === 'any')) {
      filteredAdverts = adverts.filter(function (advert) {
        return parseInt(houseGuestsField.value, 10) === advert.offer.guests;
      });
    } else {
      filteredAdverts = adverts;
    }

    return filteredAdverts;
  };


  /**
   * Функция создания массива выбранных преимуществ
   * @return {array}
   */
  var createFeaturesArray = function () {
    var temp = [];

    houseFeatures.forEach(function (feature) {
      if (feature.checked) {
        temp.push(feature.value);
      }
    });

    return temp;
  };


  var filtrateAdverts = function (adverts) {
    var tempAds = [];
    tempAds = filterByType(adverts);

    tempAds = filterByPrice(tempAds);

    tempAds = filterByRooms(tempAds);

    tempAds = filterByGuests(tempAds);

    window.utils.debounce(function () {
      window.map.renderMapPins(tempAds);
    });

  };

  /**
   * Функция изменения значения поля "Тип жилья" фильтра карты
   */
  var onHouseTypeFieldChange = function () {
    window.map.removeCards();
    window.load(filtrateAdverts);
    clearMap();
  };

  houseTypeField.addEventListener('change', onHouseTypeFieldChange);
  housePriceField.addEventListener('change', onHouseTypeFieldChange);
  houseRoomsField.addEventListener('change', onHouseTypeFieldChange);
  houseGuestsField.addEventListener('change', onHouseTypeFieldChange);
  houseFeatures.forEach(function (item) {
    item.addEventListener('change', onHouseTypeFieldChange);
  });

})();

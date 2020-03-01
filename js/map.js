'use strict';

(function () {

  /**
   * Количество показываемых пинов
   * @constant
   * @type {number}
   */
  var ADVERTS_NUM = 5;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Функция отрисовки карточки по нажатию на пин
   * @param {*} pin - пин
   * @param {*} advert - объявление
   */
  var makeCard = function (pin, advert) {
    pin.addEventListener('click', function () {
      window.card.renderCard(advert);
    });
  };

  /**
   * Функция рисует маркеры объявления из массива объектов объявлений
   * @param {*} adverts - Массив объектов объявлений
   */
  var renderMapPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ADVERTS_NUM; i++) {
      var pin = pinTemplate.cloneNode(true);
      var avatar = pin.querySelector('img');
      var advert = adverts[i];
      pin.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';
      avatar.src = advert.author.avatar;
      avatar.alt = advert.offer.title;

      makeCard(pin, advert);

      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };

  window.map = {
    renderMapPins: renderMapPins
  };
})();

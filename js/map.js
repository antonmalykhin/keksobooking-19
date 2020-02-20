'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Функция рисует маркеры объявления из массива объектов объявлений
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
      pin.addEventListener('click', function () {
        window.card.renderCard(advert);
      });
    });
    mapPins.appendChild(fragment);
  };

  window.map = {
    renderMapPins: renderMapPins
  };
})();

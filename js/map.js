'use strict';

(function () {

  var ADVERTS_NUM = 5;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = map.querySelector('.map__pins');

  var removePins = function () {
    var shownPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    shownPins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  var removeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (card) {
      map.removeChild(card);
    });
  };

  var makeCard = function (pin, advert) {
    pin.addEventListener('click', function () {
      removeCards();
      window.card.render(advert);
    });
  };

  var renderPins = function (adverts) {

    var fragment = document.createDocumentFragment();

    if (adverts.length > ADVERTS_NUM) {
      adverts = adverts.slice(0, ADVERTS_NUM);
    }

    for (var i = 0; i < adverts.length; i++) {
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
    renderPins: renderPins,
    removeCards: removeCards,
    removePins: removePins
  };
})();

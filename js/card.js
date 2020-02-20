'use strict';

(function () {
  var map = document.querySelector('.map');

  /**
   * Функция отображения окна объявления
   * @param {object} advert - Объектов объявления
   */
  var renderCard = function (advert) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__title').innerText = advert.offer.title;
    card.querySelector('.popup__text--address').innerText = advert.offer.address;
    card.querySelector('.popup__text--price').innerText = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').innerText = advert.offer.type;
    card.querySelector('.popup__text--capacity').innerText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').innerText = advert.offer.description;

    var featuresList = card.querySelector('.popup__features');
    var features = featuresList.querySelectorAll('.popup__feature');

    features.forEach(function (feature) {
      var featureItem = featuresList.removeChild(feature);
      advert.offer.features.forEach(function (offerFeature) {
        if (featureItem.classList.value.includes(offerFeature)) {
          featuresList.appendChild(featureItem);
        }
      });
    });

    var photos = card.querySelector('.popup__photos');

    if (advert.offer.photos) {
      var photo = photos.removeChild(photos.querySelector('.popup__photo'));
      advert.offer.photos.forEach(function (photoItem) {
        var photoCopy = photo.cloneNode();
        photoCopy.src = photoItem;
        photos.appendChild(photoCopy);
      });
      card.appendChild(photos);
    } else {
      card.removeChild(photos);
    }

    map.insertBefore(card, map.querySelector('.map__filters-container'));

    /**
     * Функция скрытия карточки объявления
     * @param {*} evt - Event
     */
    var onCloseCardBtnClick = function (evt) {
      if (evt.target.type === 'button') {
        map.removeChild(card);
        card.removeEventListener('click', onCloseCardBtnClick);
      }
    };

    /**
     * Функция скрытия карточки объявления по нажатию ESC
     * @param {*} evt - Event
     */
    var onEscapePress = function (evt) {
      if (evt.key === window.data.Keys.ESC) {
        map.removeChild(card);
        card.removeEventListener('click', onCloseCardBtnClick);
        window.removeEventListener('keydown', onEscapePress);
      }
    };

    card.addEventListener('click', onCloseCardBtnClick);
    window.addEventListener('keydown', onEscapePress);
  };

  window.card = {
    renderCard: renderCard
  };

})();

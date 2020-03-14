'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var clearTemplate = function (parent, childList) {
    childList.forEach(function (child) {
      parent.removeChild(child);
    });
  };

  /**
   * Функция отображения окна объявления
   * @param {object} advert - Объектов объявления
   */
  var renderCard = function (advert) {

    var card = cardTemplate.cloneNode(true);
    var featuresList = card.querySelector('.popup__features');
    var features = featuresList.querySelectorAll('.popup__feature');
    var photosList = card.querySelector('.popup__photos');
    var photos = photosList.querySelectorAll('.popup__photo');
    var photoElement = photosList.querySelector('.popup__photo');

    var createFeatureElement = function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + feature);

      return featureElement;
    };

    var createPhotoElement = function (photoSrc) {
      var tempPhoto = photoElement.cloneNode();
      tempPhoto.src = photoSrc;
      return tempPhoto;
    };

    /**
     * Функция скрытия карточки объявления
     * @param {*} evt - Event
     */
    var onCloseCardBtnClick = function (evt) {
      if (evt.target.type === 'button') {
        map.removeChild(card);
        window.map.removeCards();
        card.removeEventListener('click', onCloseCardBtnClick);
      }
    };

    /**
     * Функция скрытия карточки объявления по нажатию ESC
     * @param {*} evt - Event
     */
    var onEscapePress = function (evt) {
      if (evt.key === window.data.Keys.ESC) {
        window.map.removeCards();
        card.removeEventListener('click', onCloseCardBtnClick);
        window.removeEventListener('keydown', onEscapePress);
      }
    };

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__title').innerText = advert.offer.title;
    card.querySelector('.popup__text--address').innerText = advert.offer.address;
    card.querySelector('.popup__text--price').innerText = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').innerText = advert.offer.type;
    card.querySelector('.popup__text--capacity').innerText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').innerText = advert.offer.description;

    clearTemplate(featuresList, features);

    advert.offer.features.map(createFeatureElement).forEach(function (element) {
      featuresList.appendChild(element);
    });

    clearTemplate(photosList, photos);

    if (advert.offer.photos) {
      advert.offer.photos.map(createPhotoElement).forEach(function (element) {
        photosList.appendChild(element);
      });
    } else {
      card.removeChild(photosList);
    }

    map.insertBefore(card, map.querySelector('.map__filters-container'));

    card.addEventListener('click', onCloseCardBtnClick);
    window.addEventListener('keydown', onEscapePress);
  };

  window.card = {
    renderCard: renderCard
  };

})();

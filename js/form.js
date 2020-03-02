'use strict';

(function () {
  var main = document.querySelector('main');
  var map = main.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var advertForm = main.querySelector('.ad-form');
  var formFields = advertForm.querySelectorAll('fieldset');
  var priceField = advertForm.querySelector('#price');
  var addressField = advertForm.querySelector('#address');
  var checkinField = advertForm.querySelector('#timein');
  var checkoutField = advertForm.querySelector('#timeout');
  var roomsField = advertForm.querySelector('#room_number');
  var capacityField = advertForm.querySelector('#capacity');
  var capacities = capacityField.querySelectorAll('option');
  var typeField = advertForm.querySelector('#type');
  var notice = main.querySelector('.notice');
  var resetFormBtn = advertForm.querySelector('.ad-form__reset');

  /**
   * Функция добавления атрибута минимального значения цены в зависимости от типа жилья
   * @param {*} evt - event
   */
  var onTypeInputChange = function (evt) {
    priceField.setAttribute('min', window.data.MinPrices[evt.target.value]);
    priceField.setAttribute('placeholder', window.data.MinPrices[evt.target.value]);
  };

  /**
   * Функция устанавливает пункты селекта в неактивное состояние
   * @param {*} fields - коллекция HTML-объектов;
   */
  var makeFieldsDisabled = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  /**
   * Функция проверки доступности вариантов выбора количества мест
   * @param {*} options - коллекция HTML-объектов
   * @param {*} roomIndex - ключ
   */
  var checkRooms = function (options, roomIndex) {
    if (roomIndex === 0) {
      options[3].disabled = false;
    } else {
      for (var i = roomIndex; i > 0; i--) {
        options.forEach(function (capacity) {
          if (parseInt(capacity.value, 10) === i) {
            capacity.disabled = false;
          }
        });
      }
    }
  };

  /**
   * Функция смены количества мест в зависимости от количества выбранных комнат
   * @param {*} evt - event
   */
  var onRoomFieldClick = function (evt) {
    makeFieldsDisabled(capacities);

    checkRooms(capacities, window.data.Rooms[evt.target.value]);

    capacityField.value = window.data.Rooms[evt.target.value];
  };

  /**
   * Функция изменения поля Адрес
   */
  var changeAddressField = function () {
    addressField.value = (mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetTop + mainPin.offsetHeight + window.data.PIN_ELEMENT_HEIGHT - window.data.PIN_OFFSET_Y);
  };

  /**
   * Функция нажатия на кнопку сброса формы
   */
  var onResetFormBtnClick = function () {
    resetPage();
    resetFormBtn.removeEventListener('click', onResetFormBtnClick);
  };


  /**
   * Функция активации полей формы объявления
   */
  var activateForm = function () {
    advertForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    capacityField.value = roomsField.value;
    makeFieldsDisabled(capacities);
    checkRooms(capacities, parseInt(roomsField.value, 10));

    priceField.setAttribute('placeholder', window.data.MinPrices[typeField.value]);
    changeAddressField();

    resetFormBtn.addEventListener('click', onResetFormBtnClick);
  };

  /**
   * Функция сброса формы
   */
  var resetPage = function () {
    advertForm.reset();
    makeFieldsDisabled(formFields);
    advertForm.classList.add('ad-form--disabled');

    map.querySelectorAll('.map__pin').forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
    map.classList.add('map--faded');
    mainPin.style.top = window.data.MainPinDefaultPosition.TOP;
    mainPin.style.left = window.data.MainPinDefaultPosition.LEFT;
    mainPin.addEventListener('mousedown', window.pin.onMainPinClick);
    mainPin.addEventListener('keydown', window.pin.onMainPinEnterPress);
  };

  typeField.addEventListener('change', onTypeInputChange);

  makeFieldsDisabled(formFields);

  roomsField.addEventListener('mouseup', onRoomFieldClick);

  checkinField.addEventListener('change', function () {
    checkoutField.value = checkinField.value;
  });

  checkoutField.addEventListener('change', function () {
    checkinField.value = checkoutField.value;
  });

  /**
   * Функция показа сообщения при успешной загрузки данных с сервера
   */
  var onSuccessLoad = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    main.insertBefore(successMessage, notice);

    /**
     * Функция скрытия сообщения по нажатию мышью на свободную область
     */
    var onEmptyAriaClick = function () {
      successMessage.remove();
      resetPage();
      document.removeEventListener('click', onEmptyAriaClick);
      document.removeEventListener('keydown', onEscapeKeyPress);
    };

    /**
     * Функция скрытия сообщения по нажатию на клавишу Escape
     * @param {*} evt -   event
     */
    var onEscapeKeyPress = function (evt) {
      if (evt.key === window.data.Keys.ESC) {
        successMessage.remove();
        resetPage();
        document.removeEventListener('keydown', onEscapeKeyPress);
        document.removeEventListener('click', onEmptyAriaClick);
      }
    };
    document.addEventListener('click', onEmptyAriaClick);
    document.addEventListener('keydown', onEscapeKeyPress);
  };

  /**
   * Функция показа сообщения при ошибки загрузки данных с сервера
   */
  var onErrorLoad = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var tryAgainBtn = errorMessage.querySelector('.error__button');

    main.insertBefore(errorMessage, notice);

    /**
     * Функция скрытия сообщения
     */
    var closeErrorMessage = function () {
      errorMessage.remove();
      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      document.removeEventListener('keydown', onEscapeKeyPress);
      document.removeEventListener('click', onEmptyAriaClick);
    };

    /**
     * Функция скрытия сообщения при нажатии на кнопку "Попробовать снова"
     */
    var onTryAgainBtnClick = function () {
      closeErrorMessage();
    };

    /**
     * Функция скрытия сообщения по нажатию на клавишу Escape
     */
    var onEscapeKeyPress = function () {
      closeErrorMessage();
    };

    /**
     * Функция скрытия сообщения по нажатию мышью на свободную область
     */
    var onEmptyAriaClick = function () {
      closeErrorMessage();
    };

    tryAgainBtn.addEventListener('click', onTryAgainBtnClick);
    document.addEventListener('keydown', onEscapeKeyPress);
    document.addEventListener('click', onEmptyAriaClick);
  };

  advertForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(advertForm), onSuccessLoad, onErrorLoad);
    evt.preventDefault();
  });

  window.form = {
    activateForm: activateForm,
    changeAddressField: changeAddressField,
  };
})();

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var formFields = advertForm.querySelectorAll('fieldset');
  var priceField = advertForm.querySelector('#price');
  var addressField = advertForm.querySelector('#address');
  var checkinField = advertForm.querySelector('#timein');
  var checkoutField = advertForm.querySelector('#timeout');
  var roomsField = advertForm.querySelector('#room_number');
  var capacityField = advertForm.querySelector('#capacity');
  var capacities = capacityField.querySelectorAll('option');
  var typeField = advertForm.querySelector('#type');

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

  window.form = {
    activateForm: activateForm,
    changeAddressField: changeAddressField
  };
})();

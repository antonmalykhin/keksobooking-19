'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatar = form.querySelector('.ad-form-header__preview img');
  var houseImageChooser = form.querySelector('.ad-form__input');
  var houseImageContainer = form.querySelector('.ad-form__photo');

  /**
   * Функция загрузки изображения
   * @param {*} element
   * @param {*} prw
   */
  var loadImage = function (element, prw) {
    var image = element.files[0];
    var imageName = image.name.toLowerCase();

    var matches = window.data.FILE_TYPES.some(function (it) {
      return imageName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        prw.src = reader.result;
      });

      reader.readAsDataURL(image);
    }
  };

  /**
   * Функция создания элемента изображения и добавления в разметку
   * @return {*} houseElement
   */
  var createPreview = function () {
    var houseElement = document.createElement(window.data.HousePreviewElement.HOUSE_ELEMENT_TYPE);
    houseElement.alt = window.data.HousePreviewElement.HOUSE_ELEMENT_ALT;
    houseElement.style.width = window.data.HousePreviewElement.HOUSE_ELEMENT_WIDTH;
    houseElement.style.height = window.data.HousePreviewElement.HOUSE_ELEMENT_HEIGHT;
    houseImageContainer.appendChild(houseElement);

    return houseElement;
  };

  /**
   * Функция нажатия на кнопку выбора аватара пользователя
   */
  var onAvatarChooserChange = function () {
    loadImage(avatarChooser, avatar);
  };

  /**
   * Функция нажатия на кнопку выбора изображения жилья
   */
  var onHouseImageChooser = function () {
    var housePreview = createPreview();
    loadImage(houseImageChooser, housePreview);
  };

  // avatarChooser.addEventListener('change', onAvatarChooserChange);

  // houseImageChooser.addEventListener('change', onHouseImageChooser);

  window.images = {
    onAvatarChooserChange: onAvatarChooserChange,
    onHouseImageChooser: onHouseImageChooser
  };
})();

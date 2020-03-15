'use strict';

(function () {

  var TIMEOUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var RESPONSE_TYPE = 'json';

  var ErrorText = {
    STATUS: 'Статус ответа: ',
    DISCONNECT: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    TIME: 'мс'
  };

  var StatusCode = {
    OK: 200
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorText.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorText.DISCONNECT);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorText.TIMEOUT + xhr.timeout + ErrorText.TIME);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorText.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorText.DISCONNECT);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();

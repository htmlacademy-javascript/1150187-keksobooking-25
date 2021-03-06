const ERROR_MSG_DURATION = 5000;

const successTemplatePopup = document.querySelector('#success').content.querySelector('.success');
const errorTemplatePopup = document.querySelector('#error').content.querySelector('.error');

const showLoadError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.style.padding = '15px';
  errorMessage.style.width = '100%';
  errorMessage.style.position = 'fixed';
  errorMessage.style.top = 0;
  errorMessage.style.left = 0;
  errorMessage.style.textAlign = 'center';
  errorMessage.style.color = '#ffffff';
  errorMessage.style.backgroundColor = 'red';
  errorMessage.textContent = 'Не удалось загрузить данные';
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_MSG_DURATION);
};

const showSendError = () => {
  const errorTemplate = errorTemplatePopup.cloneNode(true);
  const tryAgainBtn = errorTemplate.querySelector('.error__button');

  const onErrorMsgEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      onErrorMsgCloseBtnClick();
    }
  };

  function onErrorMsgCloseBtnClick() {
    errorTemplate.remove();
    document.removeEventListener('keydown', onErrorMsgEscKeydown);
  }

  errorTemplate.addEventListener('click', onErrorMsgCloseBtnClick);
  tryAgainBtn.addEventListener('click', onErrorMsgCloseBtnClick);
  document.addEventListener('keydown', onErrorMsgEscKeydown);
  document.body.append(errorTemplate);
};

const showSendSuccessMsg = () => {
  const successTemplate = successTemplatePopup.cloneNode(true);

  const onSuccessMsgEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeSendSuccessMsg();
    }
  };

  function closeSendSuccessMsg() {
    successTemplate.remove();
    document.removeEventListener('keydown', onSuccessMsgEscKeydown);
  }

  successTemplate.addEventListener('click', closeSendSuccessMsg);
  document.addEventListener('keydown', onSuccessMsgEscKeydown);

  document.body.append(successTemplate);
};

const getData = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => offers)
  .catch(() => {
    showLoadError();
  });

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch((evt) => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
      throw new Error(evt);
    });
};

export { getData, sendData, showLoadError, showSendSuccessMsg, showSendError };

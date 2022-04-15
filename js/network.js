const ERROR_MSG_DURATION = 5000;

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
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const tryAgainBtn = errorTemplate.querySelector('.error__button');
  const closeErrorMsg = () => {
    errorTemplate.remove();
  };

  errorTemplate.addEventListener('click', closeErrorMsg);
  tryAgainBtn.addEventListener('click', closeErrorMsg);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMsg();
    }
  });
  document.body.append(errorTemplate);
};

const showSendSuccessMsg = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const closeSendSuccessMsg = () => {
    successTemplate.remove();
  };

  successTemplate.addEventListener('click', closeSendSuccessMsg);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSendSuccessMsg();
    }
  });

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
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData, showLoadError, showSendSuccessMsg, showSendError };

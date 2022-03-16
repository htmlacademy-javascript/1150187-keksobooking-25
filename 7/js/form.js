const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  filter.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  filterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  filter.classList.remove('ad-form--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  filterElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();

  pristine.addValidator(roomNumber, () => {
    if (roomNumber.value >= capacity.value) {
      return true;
    } else if (roomNumber.value === 100 && capacity.value === 0) {
      return true;
    }

    return false;
  }, 'Количество комнат не может быть меньше количества гостей');

  pristine.addValidator(capacity, () => {
    if (capacity.value <= roomNumber.value) {
      return true;
    } else if (roomNumber.value === 100 && capacity.value === 0) {
      return true;
    }

    return false;
  }, 'Количество комнат не может быть меньше количества гостей');
});

export {deactivatePage, activatePage};

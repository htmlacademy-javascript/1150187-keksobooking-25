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

const roomCapacityValidation = () => {
  if (roomNumber.value >= capacity.value || (roomNumber.value === 100 && capacity.value === 0)) {
    return true;
  }

  return false;
};

pristine.addValidator(roomNumber, roomCapacityValidation, 'Количество комнат не может быть меньше количества гостей');
pristine.addValidator(capacity, roomCapacityValidation, 'Количество комнат не может быть меньше количества гостей');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

export { deactivatePage, activatePage };

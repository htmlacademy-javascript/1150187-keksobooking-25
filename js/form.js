const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const propertyTypeDropdown = form.querySelector('#type');
const price = form.querySelector('#price');
const checkInDropdown = form.querySelector('#timein');
const checkOutDropdown = form.querySelector('#timeout');

const propertyTypeMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};


const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  filter.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  filterElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  filter.classList.remove('ad-form--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

checkInDropdown.addEventListener('change', () => {
  checkOutDropdown.selectedIndex = checkInDropdown.selectedIndex;
});

checkOutDropdown.addEventListener('change', () => {
  checkInDropdown.selectedIndex = checkOutDropdown.selectedIndex;
});

propertyTypeDropdown.addEventListener('change', () => {
  price.min = propertyTypeMinPrice[propertyTypeDropdown.value];
  price.placeholder = propertyTypeMinPrice[propertyTypeDropdown.value];
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

const validateRoomCapacity = () => roomNumber.value >= capacity.value || (roomNumber.value === 100 && capacity.value === 0);

pristine.addValidator(roomNumber, validateRoomCapacity, 'Количество комнат не может быть меньше количества гостей');
pristine.addValidator(capacity, validateRoomCapacity, 'Количество комнат не может быть меньше количества гостей');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

export { deactivatePage, activatePage };

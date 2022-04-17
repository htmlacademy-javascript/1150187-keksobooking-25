import { sendData } from './network.js';
import { resetMainPin } from './map.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
const addressInput = form.querySelector('#address');
const priceSlider = form.querySelector('.ad-form__slider');
const submitBtn = form.querySelector('.ad-form__submit');
const resetBtn = form.querySelector('.ad-form__reset');
const avatarInput = form.querySelector('.ad-form__field input');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const propertyImageInput = form.querySelector('.ad-form__upload input');
const propertyImagePreview = form.querySelector('.ad-form__photo');

const propertyTypeMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};


const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  filter.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  filterElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  filter.classList.remove('ad-form--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const createPicturePreview = (fileInput, filePreviewElement) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    filePreviewElement.src = URL.createObjectURL(file);
  }
};

const resetForm = () => {
  form.reset();
  resetMainPin();
};

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: (value) => parseFloat(value),
  },
});

avatarInput.addEventListener('change', () => {
  createPicturePreview(avatarInput, avatarPreview);
});

propertyImageInput.addEventListener('change', () => {
  const propertyPreview = document.createElement('img');
  propertyPreview.width = 40;
  propertyPreview.height = 44;
  propertyImagePreview.innerHTML = '';
  createPicturePreview(propertyImageInput, propertyPreview);
  propertyImagePreview.append(propertyPreview);
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

price.addEventListener('change', () => {
  priceSlider.noUiSlider.set(price.value);
});

checkInDropdown.addEventListener('change', () => {
  checkOutDropdown.selectedIndex = checkInDropdown.selectedIndex;
});

checkOutDropdown.addEventListener('change', () => {
  checkInDropdown.selectedIndex = checkOutDropdown.selectedIndex;
});

propertyTypeDropdown.addEventListener('change', () => {
  price.min = propertyTypeMinPrice[propertyTypeDropdown.value];
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: propertyTypeMinPrice[propertyTypeDropdown.value],
      max: 100000
    },
    start: propertyTypeMinPrice[propertyTypeDropdown.value]
  });
});

resetBtn.addEventListener('click', resetForm);

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

const validateRoomCapacity = () => roomNumber.value >= capacity.value || (roomNumber.value === 100 && capacity.value === 0);

pristine.addValidator(roomNumber, validateRoomCapacity, 'Количество комнат не может быть меньше количества гостей');
pristine.addValidator(capacity, validateRoomCapacity, 'Количество комнат не может быть меньше количества гостей');

const disableSubmitBtn = (btnElement) => {
  btnElement.disabled = true;
  btnElement.textContent = 'Публикую...';
};

const enableSubmitBtn = (btnElement) => {
  btnElement.disabled = false;
  btnElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitBtn(submitBtn);
      sendData(
        () => {
          onSuccess();
          enableSubmitBtn(submitBtn);
          resetForm();
        },
        () => {
          onError();
          enableSubmitBtn(submitBtn);
        },
        new FormData(evt.target)
      );
    }
  });
};

export { deactivateForm, activateForm, addressInput, setUserFormSubmit };

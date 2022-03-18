import { generateAdvertisementData } from './data.js';

const card = document.querySelector('#card').content.querySelector('.popup');

const generateAdvertisementCard = (renderData) => {
  const features = renderData.offer.features.slice();
  const photos = renderData.offer.photos.slice();
  const photoList = document.createDocumentFragment();
  const featuresList = card.querySelectorAll('.popup__feature');
  const popup = card.cloneNode(true);
  const popupTitle = popup.querySelector('.popup__title');
  const popupAddress = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.popup__text--price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTime = popup.querySelector('.popup__text--time');
  const popupDescription = popup.querySelector('.popup__description');
  const popupPhotos = popup.querySelector('.popup__photos');
  const popupAvatar = popup.querySelector('.popup__avatar');

  const propertyTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  const fillDataText = (data, element) => {
    if (!data) {
      element.classList.add('visually-hidden');
    }
    element.textContent = data;
  };

  const hideElement = (element) => {
    element.classList.add('visually-hidden');
  };

  featuresList.forEach((featureItem) => {
    const isNecessary = features.some(
      (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });

  for (let i = 0; i < photos.length; i++) {
    const PHOTO_WIDTH = '45';
    const PHOTO_HEIGHT = '40';
    const photoElement = document.createElement('img');

    photoElement.classList.add('popup__photo');
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photoElement.src = photos[i];
    photoElement.alt = 'Фотография жилья';

    popupPhotos.innerHTML = '';
    photoList.append(photoElement);
  }

  popupPhotos.append(photoList);

  fillDataText(renderData.offer.title, popupTitle);
  fillDataText(renderData.offer.address, popupAddress);
  fillDataText(renderData.offer.description, popupDescription);
  fillDataText(propertyTypes[renderData.offer.type], popupType);

  if (!renderData.offer.price) {
    hideElement(popupPrice);
  }

  if (!renderData.offer.rooms || !renderData.offer.guests) {
    hideElement(popupCapacity);
  }

  if (!renderData.offer.checkin || !renderData.offer.checkout) {
    hideElement(popupTime);
  }

  if (!renderData.author.avatar) {
    hideElement(popupAvatar);
  }

  popupPrice.textContent = `${renderData.offer.price} ₽/ночь`;
  popupCapacity.textContent = `${renderData.offer.rooms} комнаты для ${renderData.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${renderData.offer.checkin}, выезд до ${renderData.offer.checkout}`;
  popupAvatar.src = renderData.author.avatar;

  return popup;
};

const renderAdvertisement = (targetElement, qty) => {
  for (let i = 0; i < qty; i++) {
    targetElement.append(generateAdvertisementCard(generateAdvertisementData()));
  }
};

export { renderAdvertisement };
import { createSimilarAdvertisements } from './data.js';

const card = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisements = createSimilarAdvertisements();
const similarAdvertisementsList = document.createDocumentFragment();
const mapElement = document.querySelector('#map-canvas');

// Здесь я использовал slice, чтобы отрисовать только два объявления, потом уберу, когда нужно будет использовать весь массив
similarAdvertisements.slice(7, 9).forEach((advertisement) => {
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

  const getPropertyType = () => {
    let propertyType = advertisement.offer.type;
    switch (propertyType) {
      case 'flat':
        propertyType = 'Квартира';
        break;
      case 'bungalow':
        propertyType = 'Бунгало';
        break;
      case 'house':
        propertyType = 'Дом';
        break;
      case 'palace':
        propertyType = 'Дворец';
        break;
      case 'hotel':
        propertyType = 'Отель';
    }
    return propertyType;
  };

  const createPropertyFeatures = () => {
    const features = advertisement.offer.features.slice();
    const featuresList = card.querySelectorAll('.popup__feature');

    featuresList.forEach((featureItem) => {
      const isNecessary = features.some(
        (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featureItem.remove();
      }
    });
  };

  const createPhotoList = () => {
    const photos = advertisement.offer.photos.slice();
    const photoList = document.createDocumentFragment();

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
    return photoList;
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

  fillDataText(advertisement.offer.title, popupTitle);
  fillDataText(advertisement.offer.address, popupAddress);
  fillDataText(advertisement.offer.price, popupPrice);
  fillDataText(advertisement.offer.description, popupDescription);
  fillDataText(getPropertyType(), popupType);
  createPropertyFeatures();
  popupPhotos.append(createPhotoList());

  popupPrice.innerHTML = `${advertisement.offer.price} <span>₽/ночь</span>`;

  if (!advertisement.offer.rooms || !advertisement.offer.guests) {
    hideElement(popupCapacity);
  }

  if (!advertisement.offer.checkin || !advertisement.offer.checkout) {
    hideElement(popupTime);
  }

  if (!advertisement.author.avatar) {
    hideElement(popupAvatar);
  }

  popupCapacity.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  popupAvatar.src = advertisement.author.avatar;

  similarAdvertisementsList.append(popup);
});

mapElement.append(similarAdvertisementsList);

export {similarAdvertisements, mapElement};

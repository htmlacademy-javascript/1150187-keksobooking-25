import {getRandomNumber, getRandomFraction, getRandomArrayElement, createRandomArray, getRandomAvatarImage} from './util.js';

const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TITLES = ['Great Penthaus with Sea view', 'Apartments for your holidays', 'The best apartments in the city', 'Property to let'];
const DESCRIPTIONS = ['We have the best restaurant in town', 'Good apartments for good price', 'Just 15min from bus stop', 'The best property for family 2020'];
const MIN_PRICE = 2000;
const MAX_PRICE = 7000;
const MIN_ROOM = 1;
const MAX_ROOM = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const randomAvatar = getRandomAvatarImage();

const generateAdvertisementData = () => {
  const randomLat = getRandomFraction(MIN_LAT, MAX_LAT, 5);
  const randomLng = getRandomFraction(MIN_LNG, MAX_LNG, 5);

  const advertisementObject = {
    author: {
      avatar: randomAvatar()
    },
    location: {
      lat: randomLat,
      lng: randomLng
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomNumber(MIN_ROOM, MAX_ROOM),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: createRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: createRandomArray(PHOTOS)
    }
  };

  return advertisementObject;
};

export { generateAdvertisementData };

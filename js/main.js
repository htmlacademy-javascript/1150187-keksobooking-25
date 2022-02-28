const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TITLES = ['Great Penthaus with Sea view', 'Apartments for your holidays', 'The best apartments in the city', 'Property to let'];
const DESCRIPTIONS = ['We have the best restaurant in town', 'Good apartments for good price', 'Just 15min from bus stop', 'The best property for family 2020'];
const MIN_PRICE = 10;
const MAX_PRICE = 100;
const MIN_ROOM = 1;
const MAX_ROOM = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const ADVERTISEMENTS_AMOUNT = 10;
const randomAvatar = getRandomAvatarImage();

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomFraction = (min, max, afterDecimalPoint) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterDecimalPoint);
};
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];
const createRandomArray = (array) => array.slice(0, getRandomNumber(1, array.length));
function getRandomAvatarImage() {
  let i = 1;
  return function () {
    let avatarURL = '';
    if (i < 10) {
      avatarURL = `img/avatars/user0${i}.png`;
    } else {
      avatarURL = `img/avatars/user${i}.png`;
    }
    i++;
    return avatarURL;
  };
}

const createAdvertisement = () => {
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

const similarAdvertisements = Array.from({ length: ADVERTISEMENTS_AMOUNT}, createAdvertisement);

// Создание объектов
// eslint-disable-next-line no-console
console.log(similarAdvertisements);

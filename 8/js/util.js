const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomFraction = (min, max, afterDecimalPoint) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterDecimalPoint);
};
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];
const createRandomArray = (array) => array.slice(0, getRandomNumber(1, array.length));
const getRandomAvatarImage = () => {
  let i = 1;
  return () => {
    let avatarURL = '';
    if (i < 10) {
      avatarURL = `img/avatars/user0${i}.png`;
    } else {
      avatarURL = `img/avatars/user${i}.png`;
    }
    i++;
    return avatarURL;
  };
};

export {getRandomNumber, getRandomFraction, getRandomArrayElement, createRandomArray, getRandomAvatarImage};

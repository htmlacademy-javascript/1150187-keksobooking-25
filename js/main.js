const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomFraction = (min, max, afterDecimalPoint) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterDecimalPoint);
};

getRandomNumber(1, 5);
getRandomFraction(1, 5, 2);

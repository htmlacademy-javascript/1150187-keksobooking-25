const RENDER_DELAY = 500;

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
const debounce = (callback, timeoutDelay = RENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomNumber, debounce, RENDER_DELAY };

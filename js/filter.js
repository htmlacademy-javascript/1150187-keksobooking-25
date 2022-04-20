const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');

const priceMap = {
  low: { min: 0, max: 10000 },
  middle: { min: 10000, max: 50000 },
  high: { min: 50000, max: 100000 },
};

const getAllSelectedFeatures = () => {
  const selectedFeaturesArray = [];
  const selectedFeatures = filters.querySelectorAll('.map__checkbox:checked');

  selectedFeatures.forEach((element) => {
    selectedFeaturesArray.push(element);
  });

  return selectedFeaturesArray;
};

const filterAdverts = (advertisement) => {
  const checkType = () => typeFilter.value === 'any' || advertisement.offer.type === typeFilter.value;
  const checkPrice = () => priceFilter.value === 'any' ? true : advertisement.offer.price >= priceMap[priceFilter.value].min && advertisement.offer.price < priceMap[priceFilter.value].max;
  const checkRooms = () => roomsFilter.value === 'any' || advertisement.offer.rooms === Number(roomsFilter.value);
  const checkGuests = () => guestsFilter.value === 'any' || advertisement.offer.guests === Number(guestsFilter.value);
  const checkFeatures = () => {
    if (advertisement.offer.features) {
      return [...getAllSelectedFeatures()].every((feature) => (advertisement.offer.features.includes(feature.value)));
    }
  };

  return (
    checkType()
    &&
    checkPrice()
    &&
    checkRooms()
    &&
    checkGuests()
    &&
    checkFeatures()
  );
};

export { filterAdverts, filters };

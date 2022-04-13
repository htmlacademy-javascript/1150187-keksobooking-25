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

const filterAdverts = (advertisement) => {
  const selectedFeatures = filters.querySelectorAll('.map__checkbox:checked');

  const checkType = () => advertisement.offer.type === typeFilter.value || typeFilter.value === 'any';
  const checkPrice = () => priceFilter.value === 'any' ? true : advertisement.offer.price >= priceMap[priceFilter.value].min && advertisement.offer.price < priceMap[priceFilter.value].max;
  const checkRooms = () => roomsFilter.value === 'any' || advertisement.offer.rooms === Number(roomsFilter.value);
  const checkGuests = () => guestsFilter.value === 'any' || advertisement.offer.guests === Number(guestsFilter.value);
  const checkFeatures = () => {
    if (advertisement.offer.features) {
      return [...selectedFeatures].every((feature) => (advertisement.offer.features.includes(feature.value)));
    }
  };

  if (
    checkType()
    &&
    checkPrice()
    &&
    checkRooms()
    &&
    checkGuests()
    &&
    checkFeatures()
  ) {
    return true;
  }
};

const setFilterChange = (cb, filterEl) => {
  filterEl.addEventListener('change', () => cb());
};

export { filterAdverts, setFilterChange, filters };

import { deactivateForm, activateForm, addressInput } from './form.js';
import { getData } from './network.js';
import { RENDER_DELAY, debounce } from './util.js';
import { generatePopup } from './popup.js';
import { filters, filterAdverts } from './filter.js';

const ADVERTISEMENTS_AMOUNT = 10;

deactivateForm();

const startingCoordinates = {
  lat: 35.68245,
  lng: 139.76963
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView(startingCoordinates, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(startingCoordinates,
  {
    draggable: true,
    icon: mainPinIcon
  }
);

mainPin.addTo(map);

const pinsGroup = L.layerGroup().addTo(map);

addressInput.value = `${mainPin.getLatLng().lat.toFixed(5)}, ${mainPin.getLatLng().lng.toFixed(5)}`;

const createPin = (array) => {
  pinsGroup.clearLayers();
  array.filter(filterAdverts).slice(0, ADVERTISEMENTS_AMOUNT).forEach((element) => {
    const { lat, lng } = element.location;
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    });
    marker.addTo(pinsGroup).bindPopup(generatePopup(element));
  });
};

let pins = [];

getData().then((array) => {
  pins = array;
  createPin(pins);
});

filters.addEventListener('change', debounce(() => createPin(pins), RENDER_DELAY));

mainPin.on('move', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const resetMainPin = () => {
  const closePopupBtns = document.querySelectorAll('.leaflet-popup-close-button');
  closePopupBtns.forEach((element) => {
    element.click();
  });
  mainPin.setLatLng(startingCoordinates);
  addressInput.setAttribute('value', `${startingCoordinates.lat}, ${startingCoordinates.lng}`);
};

export { resetMainPin, pins, createPin };

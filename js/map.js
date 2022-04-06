import { getData } from './network.js';
import { getRandomNumber } from './util.js';
import { generatePopup } from './popup.js';
import { activateForm, addressInput } from './form.js';

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: 35.68245,
      lng: 139.76963,
    }, 13);

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

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPin = L.marker(
    {
      lat: 35.68245,
      lng: 139.76963,
    },
    {
      draggable: true,
      icon: mainPinIcon
    }
  );

  const pinsGroup = L.layerGroup().addTo(map);

  mainPin.addTo(pinsGroup);
  addressInput.value = `${mainPin.getLatLng().lat.toFixed(5)}, ${mainPin.getLatLng().lng.toFixed(5)}`;

  const createPin = (element) => {
    const lat = element.location.lat;
    const lng = element.location.lng;

    const marker = L.marker(
      {
        lat,
        lng
      },
      {
        icon: pinIcon
      }
    );

    marker
      .addTo(pinsGroup)
      .bindPopup(generatePopup(element));
  };

  getData((data) => {
    const randomNumber = getRandomNumber(0, 39);
    data.slice(randomNumber, randomNumber + 10).forEach((element) => {
      createPin(element);
    });
  });

  mainPin.on('move', (evt) => {
    addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

export { initMap };

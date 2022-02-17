mapboxgl.accessToken = 'pk.eyJ1Ijoiam9jYXJiYWxsbyIsImEiOiJja3puMzVsaWM0YTl2MzBvMWVqcHJxaWhiIn0.UJWUB-BwaxMmZH4w7eSgGQ';

// START LOCATION
const startGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: 'address',
  placeholder: 'Start Location'
});

startGeocoder.addTo('#startGeocoder');
startGeocoder.on('result', (e) => {
    let latitude = e.result.geometry.coordinates[1];
    let longitude = e.result.geometry.coordinates[0];

    let startLatitudeElem = document.querySelector('[name="startLatitudePoint"]');
    let startLongitudeElem = document.querySelector('[name="startLongitudePoint"]');

    startLatitudeElem.setAttribute('value', latitude);
    startLongitudeElem.setAttribute('value', longitude);
});

// END LOCATION
const endGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: 'address',
  placeholder: 'End Location'
});

endGeocoder.addTo('#endGeocoder');
endGeocoder.on('result', (e) => {
    let latitude = e.result.geometry.coordinates[1];
    let longitude = e.result.geometry.coordinates[0];

    let endLatitudeElem = document.querySelector('[name="endLatitudePoint"]');
    let endLongitudeElem = document.querySelector('[name="endLongitudePoint"]');

    endLatitudeElem.setAttribute('value', latitude);
    endLongitudeElem.setAttribute('value', longitude);
});

// Clear results container when search is cleared.
endGeocoder.on('clear', () => {

});
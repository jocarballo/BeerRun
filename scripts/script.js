// require axios for http calls
const axios = require('axios')
const turf = require('turf');

const ACCESS_TOKEN = "pk.eyJ1Ijoiam9jYXJiYWxsbyIsImEiOiJja3puMzVsaWM0YTl2MzBvMWVqcHJxaWhiIn0.UJWUB-BwaxMmZH4w7eSgGQ"

function getNearestBar(latitude, longitude) {
  return axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/alcohol.json?proximity=${longitude},${latitude}&type=poi&access_token=${ACCESS_TOKEN}`)
      .then(res => {
        console.log(`statusCode: ${res.status}`)
        return res.data.features[0]
      })
      .catch(error => {
        console.error(error)
      })
     
}


function getMidpoint(startLocation, endLocation) {
  let point1 = turf.point([startLocation.longitude, startLocation.latitude]);
  let point2 = turf.point([endLocation.longitude, endLocation.latitude]);

  let midpoint = turf.midpoint(point1, point2);

  return {
    longitude: midpoint.geometry.coordinates[0],
    latitude: midpoint.geometry.coordinates[1]
  }

}

function getPointsBetweenLocations(startLocation, endLocation) {
  let midPoint = getMidpoint(startLocation, endLocation);
  let betweenStartAndMid = getMidpoint(startLocation, midPoint);
  let betweenMidAndEnd = getMidpoint(midPoint, endLocation);

  return [
    startLocation,
    betweenStartAndMid,
    midPoint,
    betweenMidAndEnd,
    endLocation
  ]
}

function getBars(startLocation, endLocation) {
    let locations = getPointsBetweenLocations(startLocation, endLocation);

    Promise.all(locations.map(location => getNearestBar(location.latitude, location.longitude)))
      .then(bars => {
        console.log(bars);
      })
      .catch(err => console.log(err));
    
}

module.exports = { getBars };
  




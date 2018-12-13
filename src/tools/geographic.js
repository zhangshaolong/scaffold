const radius = 6378137 // m
const width = 20037508.3427892 // half perimeter
const maxLat = 85.05112
const pi = Math.PI

const wgs842Mercator = (lng, lat) => {
  if (lat > maxLat) {
    lat = maxLat
  }
  if (lat < -maxLat) {
    lat = -maxLat
  }
  return {
    x: width * lng / 180,
    y: width * Math.log(Math.tan(pi / 4 + lat * pi / 360)) / pi
  }
}

const mercator2Wgs84 = (mercator) => {
  return {
    lng: mercator.x / width * 180,
    lat: 180 / pi * (2 * Math.atan(Math.exp(mercator.y / width * 180 * pi / 180)) - pi / 2)
  }
}

export default {
  wgs842Mercator,
  mercator2Wgs84,
  radius
}
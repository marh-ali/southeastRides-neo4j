function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const lon1 = coords1.longitude;
  const lat1 = coords1.latitude;

  const lon2 = coords2.longitude;
  const lat2 = coords2.latitude;

  const R = 6371; // Radius of Earth in kilometers

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(3); // Distance in km, rounded to 3 decimal places
}

export default haversineDistance;

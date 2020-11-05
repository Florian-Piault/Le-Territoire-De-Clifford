var map = L.map("mapid", {
    preferCanvas: true,
  }).setView([48.866667, 2.333333], 13);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors',
  }).addTo(map);

  if ( 'geolocation' in navigator) {
    console.log('Geolocation disponible')
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude) 
        console.log(position.coords.longitude)
        var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
        marker.bindPopup("Vous etes ici.").openPopup();
    });
} else {
    console.log('Geolocation non disponible')
}




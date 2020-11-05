var map = L.map("mapid", {
    preferCanvas: true,
  }).locate({setView: true, maxZoom: 70});
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  if ( 'geolocation' in navigator) {
    console.log('Geolocation disponible')
    navigator.geolocation.getCurrentPosition(position => {
        
        console.log(position.coords.latitude) 
        console.log(position.coords.longitude)

        var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
        marker.bindPopup("Vous etes ici.").openPopup();

        var geojsonMarkerOptions = {
            radius: 4,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          };
          var arbres_lyr = L.geoJSON(arbres, {

            pointToLayer: function (feature, latlng) {
            
            return L.circleMarker(latlng, geojsonMarkerOptions);
            
            }}).addTo(map);
    });
} else {
    console.log('Geolocation non disponible')
}




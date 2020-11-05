var map = L.map("mapid", {
    preferCanvas: true,
  }).locate({setView: true, maxZoom: 70});
  
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


  /**
   * find tree data from Paris
   * */

$.ajax({
    type: "GET",
    url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable",
    success: function(data) {
        console.log(data);
    },
    error: function() {
        console.log('Error occured');
    }
});

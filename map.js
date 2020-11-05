if ("geolocation" in navigator) {
  // La géolocalisation est disponible
  console.log('OK geolocation');

  navigator.geolocation.getCurrentPosition( function( position ) {
      // Connaître la position du navigateur
      console.log(position.coords);

      // Afficher la carte
      var myMap = L.map('myMap').setView([position.coords.latitude, position.coords.longitude], 20);
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(myMap);

      // Ajouter un marker
      var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);

      getTrees(position.coords.latitude, position.coords.longitude)
      .then( function(data){
        console.log(data.records);

        data.records.map( function (item){
          var myIcon = L.divIcon({className: 'my-div-icon'});
          L.marker([item.geometry.coordinates[1],item.geometry.coordinates[0]], {icon: myIcon}).addTo(myMap)
        })
      })
      .catch( function(error){
        console.error(error);
      })
  });
} 
else {
  // La géolocalisation n'est pas disponible
  console.log('NOT geolocation');
};


///
function getgeoNavigation(){
  return "geolocation" in navigator;
}

function getUserPosition(){
  return new Promise( function(resolve, reject){
      navigator.geolocation.getCurrentPosition( function( position ) {
          // Connaître la position du navigateur
          return resolve(position.coords);
      });
  })
}

function displayMap(lat, lng){
  // Afficher la carte
  var myMap = L.map('myMap').setView([lat, lng], 20);
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(myMap);

  // Ajouter un marker
  var marker = L.marker([lat, lng]).addTo(myMap);
}


///

function getTrees(lat, lng) { 
  return new Promise( function(resolve, reject){
      fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows=5000&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable&geofilter.distance=48.8838%2C+2.2724%2C+1000')
      .then( function( rawData ){
          // Tester la requête
          if( rawData.ok === true ){
              return rawData.json()
          }
          else{
              return reject(rawData)
          }
      })
      .then( function( jsonData ){
          return resolve( jsonData )
      })
      .catch( function( fetchError ){
          return reject( fetchError )
      });

  })

}
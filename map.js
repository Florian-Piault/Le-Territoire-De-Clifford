if ("geolocation" in navigator) {
  // La géolocalisation est disponible
  console.log('Geolocation disponible');

  navigator.geolocation.getCurrentPosition( function( position ) {
      // Connaître la position du navigateur
      console.log(position.coords);

      // Afficher la carte
      var myMap = L.map('myMap').setView([position.coords.latitude, position.coords.longitude], 20);
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(myMap);

      // Ajouter un marker
      var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);

      // Recuperer les 5000 abres dans un rayon de 10km
      getTrees(position.coords.latitude, position.coords.longitude,5000)
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
  console.log('Geolocation non disponible');
};


function getgeoNavigation(){
  return "geolocation" in navigator;
}

// retourne la position de l'utilisateur
function getUserPosition(){
  return new Promise( function(resolve, reject){
      navigator.geolocation.getCurrentPosition( function( position ) {
          // Connaître la position du navigateur
          return resolve(position.coords);
      });
  })
}

// Afficher la carte
function displayMap(lat, lng){
  var myMap = L.map('myMap').setView([lat, lng], 20);
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(myMap);

  // Ajouter un marker
  var marker = L.marker([lat, lng]).addTo(myMap);
}


// Recuperer tous les arbres dans un rayon de 10km 
function getTrees(lat, lng,nmb) { 
  return new Promise( function(resolve, reject){
      fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows='+nmb+'&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable&geofilter.distance='+ lat +'%2C+'+ lng +'%2C+1000')
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
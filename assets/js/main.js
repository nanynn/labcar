function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom:5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl:false,
		zoomControl:false,
		streetViewControl:false
	});

	function buscar(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}	

	window.addEventListener('load', buscar);

	var latitud, longitud;

	var funcionExito= function(posicion){
			latitud = posicion.coords.latitude;
			longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});	

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud})
	}

	var funcionError = function(error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}

	/*Autocompletado input*/
	var inOrigen = (document.getElementById('origen'));
	var autocomplete = new google.maps.places.Autocomplete(inOrigen);
  	autocomplete.bindTo('bounds', map);

	var inDestino = (document.getElementById('destino'));
	var autocomplete = new google.maps.places.Autocomplete(inDestino);
  	autocomplete.bindTo('bounds', map);

  	/*Marcar la ruta*/
  	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    document.getElementById('origen').addEventListener('change', onChangeHandler);
    document.getElementById('destino').addEventListener('change', onChangeHandler);
  	

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
        origin: document.getElementById('origen').value,
        destination: document.getElementById('destino').value,
        travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
    	}); 
    }

    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    	};

   

  	var rutaBtn = document.getElementById('ruta');
  	rutaBtn.addEventListener('click', onChangeHandler);

}	
	

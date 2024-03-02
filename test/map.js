var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        });
    }

    // Listen for click on map
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    console.log(latLng);
    map.panTo(latLng);
    infoWindow.setContent('Lat: ' + latLng.lat() + ', Lng: ' + latLng.lng());
    infoWindow.open(map, marker);
}
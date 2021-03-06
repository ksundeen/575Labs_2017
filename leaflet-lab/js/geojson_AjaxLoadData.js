function showMap(){

// Bubbleman Map
    var bubbleMap = L.map('bubblemanId', {
        center: [46.75, -92.1],
        zoom: 5
    });
    
    // Add Bubbleman Map
    bubbleTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ksundeen.e08ed0a0',
        accessToken: 'pk.eyJ1Ijoia3N1bmRlZW4iLCJhIjoiY2lzbTlheDNwMDBnbzJxbXhyOWd0M21ndSJ9.44Hkp6jPecmKKsXfQUuykg'
    });


//    mydata = L.geoJSON(geojsonFeature);

    bubbleTileLayer.addTo(bubbleMap); 

    // Add marker
    var marker = L.marker([46.75, -92.1]).addTo(bubbleMap);
    
    // Add circle
    var circle = L.circle([46.7, -92.0], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(bubbleMap);
    
    // Add polygon 
    var polygon = L.polygon([
        [46.7, -92.0],
        [46.75, -92.1],
        [46.9, -92.2]
    ]).addTo(bubbleMap);
    
    // Adding popups
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");
    
    // Standalone popup
    var popup = L.popup()
    .setLatLng([46.7, -92.0])
    .setContent("I am a standalone popup.")
    .openOn(bubbleMap);
    
    // Click to show Lat Long on map 
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Location: " + e.latlng.toString())
            .openOn(bubbleMap);
    }

    bubbleMap.on('click', onMapClick);
    getData(bubbleMap);
}

function getData(map){
    //load the data
    $.ajax("data/world9gaminglocations.geojson", {
        dataType: "json",
        success: function(response){
            
                // Create custom markers
                var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }

            //create a Leaflet GeoJSON layer and add it to the map
            }).addTo(map);
        }
    });
};

$(document).ready(showMap);
function showMap(){

// Bubbleman Map
    var mymap = L.map('schoolmap', {
        center: [38.548, -96.767],
        zoom: 4
    });
    
    // Add Bubbleman Map
//    bubbleTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//        maxZoom: 18,
//        id: 'ksundeen.e08ed0a0',
//        accessToken: 'pk.eyJ1Ijoia3N1bmRlZW4iLCJhIjoiY2lzbTlheDNwMDBnbzJxbXhyOWd0M21ndSJ9.44Hkp6jPecmKKsXfQUuykg'
//    });
//    
//    bubbleTileLayer.addTo(mymap); 
    
    
    // Add OpenStreetMap basemap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

    // Add marker
    var marker = L.marker([46.75, -92.1]).addTo(mymap);
    
    // Add circle
    var circle = L.circle([46.7, -92.0], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
    
    // Add polygon 
    var polygon = L.polygon([
        [46.7, -92.0],
        [46.75, -92.1],
        [46.9, -92.2]
    ]).addTo(mymap);
    
    // Adding popups
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");
    
    // Standalone popup
    var popup = L.popup()
    .setLatLng([46.7, -92.0])
    .setContent("I am a standalone popup.")
    .openOn(mymap);
    
    // Click to show Lat Long on map 
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Location: " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
    getAjaxData(mymap);
}

// Changes marker color
function pointToLayer(feature, latlng) {
    // Create custom markers
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    L.circleMarker(feature, geojsonMarkerOptions);

};


// Creates a popups for each feature using a loop
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    
    if (feature.properties && feature.properties.year) {
        layer.bindPopup(feature.properties.description);
        
        // Loop to add feature property names and values to html string
        // --adds all field values to popup. Could use if wanting to show data for all years
        // --if data are structured like that!
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties.description + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

function getAjaxData(map){
    //load the data
    $.ajax("data/university_enrollments_over10k.geojson", {
        dataType: "json",
        success: function(response){
            
            console.log("I'm running in the getAjaxData()");
            
            //create a Leaflet GeoJSON layer
            var geoJsonLayer = L.geoJson(response);
            
            //create a L.markerClusterGroup layer
            var markers = L.markerClusterGroup();
            
            //add geojson to marker cluster layer
            markers.addLayer(geoJsonLayer);
            
            //add marker cluster layer to map
            map.addLayer(markers);            
            
            /* 
            //create an L.markerClusterGroup layer
            var markers = L.markerClusterGroup();

            //loop through features to create markers and add to MarkerClusterGroup
            for (var i = 0; i < response.features.length; i++) {
                var a = response.features[i];
                //add properties html string to each marker
                var properties = "";
                for (var property in a.properties){
                    properties += "<p>" + property + ": " + a.properties[property] + "</p>";
                };
                var marker = L.marker(new L.LatLng(a.geometry.coordinates[1], a.geometry.coordinates[0]), { properties: properties });
                //add a popup for each marker
                marker.bindPopup(properties);
                //add marker to MarkerClusterGroup
                markers.addLayer(marker);
            }

            //add MarkerClusterGroup to map
            map.addLayer(markers);
            */
        }
    });
};
            
$(document).ready(showMap);
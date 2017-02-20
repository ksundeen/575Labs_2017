function showMap(){

// Bubbleman Map
//    var bubbleMap = L.map('bubblemanId').setView([46.75, -92.1], 10);
    
    // Add Bubbleman Map
    bubbleTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ksundeen.e08ed0a0',
        accessToken: 'pk.eyJ1Ijoia3N1bmRlZW4iLCJhIjoiY2lzbTlheDNwMDBnbzJxbXhyOWd0M21ndSJ9.44Hkp6jPecmKKsXfQUuykg'
    });


    // Creating a GeoJSON feature
    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Twin Ports Testing",
            "amenity": "Work",
            "popupContent": "This is where Stephen works!"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-92.18, 46.69]
        }
    };

    console.log("I'm located above geojsonFeature");
    mydata = L.geoJSON(geojsonFeature);
    var bubbleMap = L.map('bubblemanId').setView([46.75, -92.1], 10);

    bubbleTileLayer.addTo(bubbleMap);    
    mydata.addTo(bubbleMap);
    console.log("I'm located below geojsonFeature");

    // Add marker to openstreetmap
    var marker = L.marker([46.75, -92.1]).addTo(bubbleMap);
    
    // Add circle to openstreetmap
    var circle = L.circle([46.7, -92.0], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(bubbleMap);
    
    // Add polygon to openstreetmap
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
    
}

$(document).ready(showMap);
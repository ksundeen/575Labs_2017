function showMap(){
    // school Map
    var mymap = L.map('schoolmap', {
        center: [38.548, -96.767],
        zoom: 4
    });
    
    // Add OpenStreetMap basemap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
    
    var popup = L.popup()
    
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

//// creates a popups for each feature using a loop
//function onEachFeature(feature, layer) {
//    //no property named popupContent; instead, create html string with all properties
//    var popupContent = "";
//    
//    if (feature.properties && feature.properties.year) {
//        layer.bindPopup(feature.properties.description);
//        
//        // Loop to add feature property names and values to html string
//        // --adds all field values to popup. Could use if wanting to show data for all years
//        // --if data are structured like that!
//        for (var property in feature.properties){
//            popupContent += "<p>" + property + ": " + feature.properties.description + "</p>";
//        }
//        layer.bindPopup(popupContent);
//    };
//};

// calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    // Scale factor to adjust symbol size evenly
    var scaleFactor = .005;
    // Area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    // Radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    return radius;
};

// Step 3: Add circle markers for point features to the map
function pointToLayer(feature, latlng) {
    // symbolize 1 attribute
    var attribute = "fall_2012";
    
    // create marker options
    var options = {
        radius: 8,
        fillColor: "#25a7da",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };        

    // for each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    console.log("feature.properties[myAttribute]:", attValue);

    // give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);    
    console.log("options.radius: ", options.radius);

    // create circle marker layer
    var layer = L.circleMarker(latlng, options);
    
    // build popup content string
    var panelContent = "<p><b>Enrollment: </b>" + feature.properties.university + "</p>";
    
    var year = attribute.split("_")[1];
    panelContent += "<p><b>Enrollment in " + year + ": </b> " + feature.properties[attribute] + " students</p>";
    
    // popupContent changed for hover tooltip
    var popupContent = feature.properties.university;

    // bind the popup to the circle marker
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-options.radius),
        closeButton: false
    });

    // add event listeners for on hover
    layer.on({
       mouseover: function() {
           this.openPopup();
       },
       mouseout: function() {
           this.closePopup();
       },
       click: function() {
            $("#panel").html(panelContent);
       }
    });
    
    // return  circle marker to the L.geoJson pointToLayer option
    return layer;    
    };

function createPropSymbols(data, map) {   
    // create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: pointToLayer // Takes function pointToLayer
    }).addTo(map);
};

// create sequence controls
function createSequenceControls(map) {
    // append a range-slider to dom
    $('#panel').append('<input class="range-slider" type="range">');
}

// Step 2: Import JSON data
function getAjaxData(map){
    // load the data
    $.ajax("data/university_enrollments_over10k.geojson", {
        dataType: "json",
        success: function(response) {
            createPropSymbols(response, map);
            createSequenceControls(map);
        }
    });
};
            
$(document).ready(showMap);
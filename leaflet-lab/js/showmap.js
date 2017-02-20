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

// Add circle markers for point features to the map
function pointToLayer(feature, latlng, attributes) {
    // symbolize current attribute in attributes array
    var attribute = attributes[0];
    console.log(attribute);
    
//    // symbolize 1 attribute
//    var attribute = "fall_2012";
    
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

function createPropSymbols(data, map, attributes) {   
    // create a Leaflet GeoJSON layer and adds it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

// Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute) {
    map.eachLayer(function(layer) {
       // checks for existence of feature in layer & of a selected attribute in layer
       if (layer.feature && layer.feature.properties[attribute]) {
           // update layer style & popup   
           // access feature properties
           var props = layer.feature.properties;
           
           // update each feature's radius based on new attribute vals
           var radius = calcPropRadius(props[attribute]);
           layer.setRadius(radius);
           
           // add "University" text to popup content string
           var popupContent = "<p><b> University:</b> " + props.university + "</p>";
           
           // add formatted year value attribute to panel content string
           var year = attribute.split("_")[1];
           
           // replace layer popup
           layer.bindPopup(popupContent, {
               offset: new L.Point(0,-radius)
           });
       };
    });
};

// create sequence controls
function createSequenceControls(map, attributes) {
    // append a range-slider to dom
    $('#panel').append('<input class="range-slider" type="range">');
    $('#panel').append('<button class="skip" id="reverse">Reverse</button>');
    $('#panel').append('<button class="skip" id="forward">Skip</button>');    
    $('#reverse').html('<img src="img/reverse.png">');
    $('#forward').html('<img src="img/forward.png">');
    
    // set slider attributes
    $('.range-slider').attr({
        max: 6,
        min: 0,
        value: 0,
        step: 1
    });
    
    // add click listener events for buttons
    $('.skip').click(function() {
        // get old index value
        var index = $('.range-slider').val();
        
        // increment/decrement depending on button clicked
        if ($(this).attr('id') == 'forward') {
            index++;
            
            // if passed last attribute, wrap to beginning again // shorthand if-else: "if index is greater than 6, return 0, else return index"
            index = index > 6 ? 0 : index;    
        } else if ($(this).attr('id') == 'reverse') {
            index--;
            
            // if passed last attribute, wrap to beginning again // shorthand if-else: "if index is less than 0, return 6, else return index"
            index = index < 0 ? 6 : index;
        };
        
        // update slider with value
        $('.range-slider').val(index);
        
        // pass new attribute to update proportional symbol sizes
        updatePropSymbols(map, attributes[index]);
    });
    
    // input listener for slider
    $('.range-slider').on('input', function() {
        // get new index value of sequence
        var index = $(this).val();
        console.log(index);
        
        // pass new attribute to update proportional symbol sizes
        updatePropSymbols(map, attributes[index]);
    })
};

// Builds attribute array
function processData(data) {
    var attributes = [];
    
    // properties of 1st feature in dataset
    var properties = data.features[0].properties;
    console.log("Properties: ", properties);
    
    // loop through all attributes & populate list
    for (var attribute in properties) {
        // only take attributes with enrollment values, searching for header with "enroll" in the value
        if (attribute.indexOf("fall") > -1) {
            attributes.push(attribute);
        }
    }
    
    console.log(attributes);
    return attributes;
}

// Import JSON data
function getAjaxData(map){
    // load the data
    $.ajax("data/university_enrollments_over10k.geojson", {
        dataType: "json",
        success: function(response) {
            // hold data attributes as an array
            var attributes = processData(response);
            createPropSymbols(response, map, attributes);
            createSequenceControls(map, attributes);
        }
    });
};
            
$(document).ready(showMap);
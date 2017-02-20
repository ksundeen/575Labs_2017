"use strict";

function debugCallback(mydata){
	$(mydiv).append('GeoJSON data in debugCallback(): ' + JSON.stringify(mydata));
    console.log(mydata);
};

function debugAjax(){
	
	var mydata = "data/MegaCities_LatLong.geojson";

	$.ajax(mydata, {
		dataType: "json",
		success: debugCallback
	});
    
//    console.log(mydata);

//	$("#mydiv").append('<br>GeoJSON data within debugAjax():<br>' + JSON.stringify(mydata));};

// Removed since this is in the callback function
//$("#mydiv").append('GeoJSON data showing up at end: ' + JSON.stringify(mydata));


//$(document).ready(debugAjax);
window.onload = debugAjax();
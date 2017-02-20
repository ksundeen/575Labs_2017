/* main.js by Randy Sincoular 16-Jan-17 */

"use strict";

//* ------------------------------------------------------------
//* debugCallback
//* This is the callback function that is called
//* After reading in the geoJSON data from
//*  the debugAjax() function
//* -------------------------------------------------------------
function debugCallback(mydata){

        console.log("in debugCallback() ..");

	      $(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));

        console.log("  printing geoJSON Object Using stringify: ",JSON.stringify(mydata));


};  // end debugCallback()

//* --------------------------------------------------------
// * debugAjax()
//*  This function reads in the geoJSON file
//*   from: data/map.geojson
//* ---------------------------------------------------------
function debugAjax(){

      //* Location of my geoJSON data file
      var myGeoJSONFile = "data/map.geojson";

      console.log(" in debugAjax() ...");

      console.log("  Reading geoJSON data now ...");

      //* Read in thegeoJSON file
      //* --------------------------------
      $.ajax(myGeoJSONFile, {
      dataType: "json",
      success:   debugCallback
      });

      console.log("  geoJSON data has been read in ...");
      // console.log(JSON.stringify(myJSONData));

      // mydata is not defined at this point
	   // $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));

};  // end debugAjax()

// mydata is not defined here
// $(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));


//* After the page has been loaded, call the debugAjax() function
//* ---------------------------------------------------------------------------------
window.onload = debugAjax();

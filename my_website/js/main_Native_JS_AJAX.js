/*
function jsAjax(){
    // Step 1: Create the request 
    var ajaxRequest = new XMLHttpRequest();

    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState === 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
    ajaxRequest.open('GET', 'data/MegaCities_LatLong.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
};

//define callback function
function callback(response){
    //tasks using the data go here
    console.log(response);
    console.log(JSON.stringify(response));
};

window.onload = jsAjax();
*/

// Replaces above code with jQuery
//define AJAX function
function jQueryAjax(){
    //basic jQuery ajax method
    $.ajax("data/MegaCities_LatLog.geojson", {
        dataType: "json",
        success: callback
    });
};

//define callback function
function callback(response, status, jqXHRobject){
    //tasks using the data go here
    console.log(response);
};

$(document).ready(jQueryAjax);
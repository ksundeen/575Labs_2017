function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/MegaCities_LatLong.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;
            console.log(mydata);
        }
    });

    //check the data
    console.log(mydata);
};

$(document).ready(jQueryAjax);
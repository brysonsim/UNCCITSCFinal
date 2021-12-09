const apiKey = "b858cb3781983028b914749ba5d871c2";
let inputVal = "Charlotte";
let page = "";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

$(document).ready(function() {
    var test = new XMLHttpRequest();
    test.open('GET', url, true);
    $("#ajax-fill").html("");
    test.onload = function () {
        var jsob = JSON.parse(this.response);
        console.log(jsob);
        //var temp = jsob.main.temp;
        //console.log(jsob.weather[0].description);

        $("#ajax-fill").append("<img id=\"symbol\" class=\"symbols\" src=\"" + "WeatherItems/weather-icons-master/svg/wi-day-sunny.svg\">" +
            "<h1 id=\"cityA\">" + jsob.name +"</h1>"+
            "<h2 id=\"temp\">" + Math.round(convert(jsob.main.temp)) + "&#176 F</h2>"+
            "<h3 id=\"description\">" + jsob.weather[0].description + "</h3>" +
            "<p >"+"Wind Speed: " + jsob.wind.speed + " " + direction(jsob.wind.deg) +"</p>"+
            "<p id=\"pressure\">Hurricane unlikely Atmospheric pressure:" + jsob.main.pressure + "</p>"+ "<br><br><br><br>");


    }
    test.send();
});
/*$("#submit").onclick = update;

function update(){

    inputVal = $("#city").value();

    var test = new XMLHttpRequest();
    test.open('GET', url, true);
    $("#ajax-fill").html("");
    test.onload = function () {
        var jsob = JSON.parse(this.response);
        console.log(jsob);
        //var temp = jsob.main.temp;
        //console.log(jsob.weather[0].description);

        $("#ajax-fill").append("<img id=\"symbol\" class=\"symbols\" src=\"" + "WeatherItems/weather-icons-master/svg/wi-day-sunny.svg\">" +
            "<h1 id=\"city\">" + jsob.name +"</h1>"+
            "<h2 id=\"temp\">" + Math.round(convert(jsob.main.temp)) + "&#176 F</h2>"+
            "<h3 id=\"description\">" + jsob.weather[0].description + "</h3>");

    }
    test.send();
}*/

function convert(cel){
    let fahrenheit = cel * 9 / 5 + 32;
    return fahrenheit;
}

function direction(deg){
    let val = Math.floor((deg/22.5)+.5)
    let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    return arr[(val % 16)]
}
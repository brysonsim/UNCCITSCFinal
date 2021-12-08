const apiKey = "b858cb3781983028b914749ba5d871c2";
let inputVal = "Charlotte";
let page = "";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

$(document).ready(function() {
    /* fetch(url)
         .then(response => response.json())
         .then(data => {
             // do stuff with the data
             const { main, name, sys, weather } = data;

             const page = '<img id="symbol" className="symbols" src="WeatherItems/weather-icons-master/svg/wi-day-sunny.svg">'+
                 '<h1 id="city">${name}</h1>'   +
                 '<h2 id="temp">${Math.round(main.temp)}</h2>' +
                 '<h3 id="description"> ${weather[0],["description"]} </h3';
             console.log(page);
             $("containerF").innerHTML = page;
         });*/

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
            "<p id=\"pressure\">" + jsob.main.pressure + "</p>");

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
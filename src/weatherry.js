const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const condition = document.querySelector('.condition');
const name = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

jQuery.get("https://ipinfo.io", function (country) {
    // alert(country.city)
    let city = country.city
    
    cityInput = city;

cities.forEach((city)=>{
    city.addEventListener('click', (e)=>{
        // alert('yess')
        cityInput = e.target.innerHTML
        fetchWeatherData();
        app.style.opactiy = 0
    })
})
form.addEventListener('submit',(e)=>{
    // alert(search.value.length)
    if(search.value.length == 0){
        alert('Please Type In a City Name')
    }else{
        cityInput = search.value
        fetchWeatherData();
        search.value = ""
        app.style.opactiy= "0";
    }

    e.preventDefault();
})

function dayOfTheWeek(day, month, year){
    const weekDay = [
        "Sunday",
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ];
    return weekDay[new Date(`${day}/${month}/${year}`).getDay()]
}

function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=0ecab050f54a499abca101057242805&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        temp.innerHTML = data.current.temp_c + "&#176;";
        condition.innerHTML = data.current.condition.text;
        const dates = data.location.localtime;
        const y = parseInt(dates.substr(0,4));
        const m = parseInt(dates.substr(5,2));
        const d = parseInt(dates.substr(8,2));
        const times = dates.substr(11);
       
        //comeback to fix
        // alert(dayOfTheWeek(d,m,y))
        // console.error(dayOfTheWeek(d,m,y))

        date.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        time.innerHTML = times;

        name.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)

        // console.log(iconId)
        // alert(icon.innerHTML)
        icon.src ="./icons/"+ iconId;

        cloud.innerHTML = data.current.cloud + "%";
        humidity.innerHTML = data.current.humidity + "%"; 
        wind.innerHTML = data.current.wind_kph + "km/h"

        let timeOfDay = "day";
        const code = data.current.condition.code;
        
        
        if(!data.current.is_day){
            timeOfDay = "night"
        }
        
        console.log(timeOfDay)
        //clear
        if(code == 1000){
            app.style.backgroundImage = `url(../Images/${timeOfDay}/clear.jpg)`
            btn.style.background = "#e5ba92";

            if(timeOfDay == "night"){
                btn.style.background = "#181e27"
            }
        //Cloudy Weather
        }else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282){
                app.style.backgroundImage = `url(../Images/${timeOfDay}/cloudy.jpg)`
                btn.style.background = "#fa6d1b";

                if(timeOfDay == "night"){
                    btn.style.background = "#181e27"
                }

        //Rainy Weather        
        }else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252){
                app.style.backgroundImage = `url(../Images/${timeOfDay}/rainy.jpg)`
                btn.style.background = "#647d75";

                if(timeOfDay == "night"){
                    btn.style.background = "#325c80"
                }
        //Snow Weather        
        }else{
            app.style.backgroundImage = `url(../Images/${timeOfDay}/snowy.jpg)`
            btn.style.background = "#4d72aa";

            if(timeOfDay == "night"){
                btn.style.background = "#1b1b1b"
            }
        }
        app.style.opactiy = "1"
        
        // console.log(timeOfDay)
    }

    )
    .catch( ()=> {
         alert("Oops, City not found. Please try Again")
        app.style.opactiy = "1"
    }
  )

}
fetchWeatherData();

},"jsonp")


const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('search-btn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById( 'humidity');
const wind_speed = document.getElementById('wind');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
async function checkWeather(city){
    const api_key = "fe43d66c9f3936c7e7c78746f2c476a2"
     const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
     const weather_data = await fetch(`${url}`).then(response => response.json());
    if(weather_data.cod == '404'){
        alert("City not found");
        return;
    }

    setInterval(() => {
        const time = new Date();
        const date = time.toLocaleDateString();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const ampm = hour >=12 ? 'PM' : 'AM'

        timeEl.innerHTML =hoursIn12HrFormat + ':' + minutes  + `<span id="am-pm">${ampm}</span>`
        dateEl.innerHTML = date;
    },1000);
    
     temperature.innerHTML = `${ Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
        

    humidity.innerHTML = ` ${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/sun.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
    }


    console.log(weather_data);
}

searchBtn.addEventListener ('click', ()=>{
    checkWeather(inputBox.value);
}); 
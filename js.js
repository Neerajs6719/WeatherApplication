const aKey = "e7a2e37bb0cf042d33d08391800e655a";
const searchBox = document.querySelector(".search input")
const search = document.querySelector(".search-bar")
const searchbtn = document.querySelector(".search button" )

console.log(searchBox.value)

async function getWeather(city){
   
const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city || "delhi"}&appid=${aKey}&units=metric`);
    const data = await response.json();
    console.log(data)
    return data;          
}

function displayWeather(data){
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = '';

    document.querySelector(".city").innerText = "Today's Weather in " + data.city.name;
    document.querySelector(".temp").innerText = data.list[0].main.temp  + "°C";
    document.querySelector(".min").innerText = data.list[0].main.temp_min + "°C";
    document.querySelector(".max").innerText = data.list[0].main.temp_max + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + data.list[0].main.humidity + "%";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
    document.querySelector(".description").innerText = data.list[0].weather[0].description;
    document.querySelector(".wind").innerText = "Wind Speed: " +data.list[0].wind.speed  + "Km/h"
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920×1080/? " + data.city.name || "delhi"+ "')"

    data.list.forEach((item , index) => {

        const weatherDay = document.createElement('div');
        weatherDay.classList.add('cards');
       
        if(index % 8 === 0){
            const name = data.city.name;
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temperature = Math.round(item.main.temp);
            const description = item.weather[0].description;
            const min_tem = item.main.temp_min;
            const max_tem = item.main.temp_max;
            const wind_speed = item.wind.speed;
            const humidity = item.main.humidity;
            const icon = item.weather.icon;
             
          weatherDay.innerHTML = ` 
                                    <h1 class="day">${day}</h1>
                                    <h1 class="temperature">${temperature + '°C'}</h1>
                                    <span class='icons'>
                                    <span ><img src="https://openweathermap.org/img/wn/01n.png" alt="icon" class="icon" /></span>
                                    <span >${description}</span>

                                    </span>
                                    
                                    <h2>Max-Temp : <span class="temp_max">${max_tem+ '°C'}</span></h2>
                                    <h2>Min-Temp : <span class="temp_min">${min_tem+ '°C'}</span></h2>               
        `;
        weatherContainer.appendChild(weatherDay);  
        }

    });
    console.log(clutter);
    console.log(data.list[0].weather[0].icon)

            document.querySelector('.card').innerHTML= clutter;
}

async function get(){
    const data = await getWeather('delhi');
    console.log(data)
        displayWeather(data);
}

get();
async function enter(){
    const city = searchBox.value;
    
        if (city) {
            const weatherData = await getWeather(city);
           
            if (weatherData) {
                displayWeather(weatherData);
                searchBox.value='';
            }
        } else {
            alert('Please enter a city name');
        }
    }
   
searchbtn.addEventListener('click', async () => {
     var city =searchBox.value;
    if (city) {
        const weatherData = await getWeather(city);
        searchBox.value = '';
        if (weatherData) {
            displayWeather(weatherData);
           

        }
       
    } else {
        alert('Please enter a city name');
        
    }
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
       
        enter();
    }
});

















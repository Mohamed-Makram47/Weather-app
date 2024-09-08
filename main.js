async function getweather(cityname) {
    const apiKey = 'b6ef0bce4631f192f530ec89bb03e505';  
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
    let responce = await fetch(api)
    let data = await responce.json()
    if (responce.status==404){
        document.querySelector('.weather').style.display = 'none'
        document.querySelector('.more').style.display = 'none'
        document.querySelector('.error').style.display = 'block'
    }
    else{
        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temp').innerHTML = parseInt(data.main.temp)+ `°c`
        document.querySelector('.humidity h1').innerHTML = parseInt(data.main.humidity) + `%`
        document.querySelector('.wind h1').innerHTML = parseInt(data.wind.speed) + `Km/h`
        document.querySelector('.weather img').src = `Photos/${data.weather[0].main.charAt(0).toLowerCase() + data.weather[0].main.slice(1)}.png`;
        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.more').style.display = 'flex'
        localStorage.setItem('lastCity', data.name);
        console.log(data)
    }
}


let search = document.querySelector('.search i')
let searchbox = document.querySelector('.search input')

search.addEventListener('click' , () => {
    getweather(searchbox.value)
})
searchbox.addEventListener('keydown' , (event) => {
    if (event.key === 'Enter'){
        getweather(searchbox.value)
    }
})

window.onload = () => {
    let lastCity = localStorage.getItem('lastCity');
    getweather(lastCity);
    searchbox.value = lastCity;  
};




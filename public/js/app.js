const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const weatherText = document.querySelector('#temp');
const locationText = document.querySelector('#location');
const iconImg = document.querySelector('#icon');
const humidityText = document.querySelector('#humidity');
const descriptionText = document.querySelector('#description');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInputVal = searchInput.value;
    
    descriptionText.textContent = "Loading...";
    weatherText.textContent = "";
    locationText.textContent = "";
    humidityText.textContent = "";
    descriptionText.textContent = "";
    iconImg.style.display = "none";
    
    if (searchInputVal == "") {
        console.log('Type a location');
    } else {
        fetch('/weather/?search=' + searchInputVal).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    weatherText.textContent = data.temp + '°C (feelslike: ' + data.feelslike + '°C)';
                    locationText.textContent = data.location;
                    iconImg.src = data.icon;
                    iconImg.style.display = 'block';
                    humidityText.textContent = data.humidity + '%';
                    descriptionText.textContent = data.description;
                }
            });
        });
    }
});
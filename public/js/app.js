const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const weatherText = document.querySelector('#temp');
const locationText = document.querySelector('#location');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInputVal = searchInput.value;
    
    weatherText.textContent = "Loading...";
    locationText.textContent = "";
    
    if (searchInputVal == "") {
        console.log('Type a location');
    } else {
        fetch('/weather/?search=' + searchInputVal).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    weatherText.textContent = data.temp + '°C';
                    locationText.textContent = data.location;
                }
            });
        });
    }
});
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const weatherText = document.querySelector('#temp');
const locationText = document.querySelector('#location');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInputVal = searchInput.value;
    
    weatherText.textContent = "Carregando...";
    locationText.textContent = "";
    
    if (searchInputVal == "") {
        console.log('Digite um nome para a cidade');
    } else {
        fetch('http://localhost:3000/weather/test/?search=' + searchInputVal).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    weatherText.textContent = data.temp;
                    locationText.textContent = data.location;
                }
            });
        });
    }
});
const messageBox = document.getElementById('message');
const latitudeBox = document.getElementById('latitude');
const longitudeBox = document.getElementById('longitude');
const timeBox = document.getElementById('time');

if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
        latitudeBox.textContent = position.coords.latitude;
        longitudeBox.textContent = position.coords.longitude;
        timeBox.textContent = position.timestamp;
    });
} else {
    messageBox.textContent = 'Sorry, geolocation is not supported by your browser&#128530;';
}
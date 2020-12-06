const messageBox = document.getElementById('message');
const latitudeBox = document.getElementById('latitude');
const longitudeBox = document.getElementById('longitude');
const countryBox = document.getElementById('country');
const countryParentBox = document.getElementById('country-parent');

if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        latitudeBox.textContent = lat;
        longitudeBox.textContent = long;

        (async function() {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=3&lat=${lat}&lon=${long}`, {cache: 'no-store'});
            return response.json();
        })()
        .then(data => {
            countryBox.textContent = data.address.country + String.fromCodePoint(0x1F609);
        })
        .catch(err => {
            countryParentBox.textContent = 'Unable to get your country. Please make sure you have a good connection.';
        });

    },
    error => {
        messageBox.textContent = 'Unable to get your location. Please make sure you have a good connection.';
    });
} else {
    messageBox.textContent = 'Sorry, geolocation is not supported by your browser' + String.fromCodePoint(0x1F612);
}
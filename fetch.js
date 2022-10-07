let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLon = document.querySelector('#iss-lon')
let datetime = document.querySelector('#datetime')

let update = 10000
let maxFailedAttempts = 3;

let issMarker
let icon = L.icon({
    iconUrl: 'noun-iss-956251.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

iss(maxFailedAttempts)
// setInterval(iss, update)

function iss(attempts) {
    if(attempts <= 0) {
        alert('Failed to communicate with ISS server. Too bad haha')
        return
    }


    fetch(url).then(res => res.json()).then(issData => {
        console.log(issData)
        let lat = issData.latitude
        let lon = issData.longitude
        issLat.innerHTML = lat
        issLon.innerHTML = lon
        datetime.innerHTML = Date()

        if(!issMarker) {
            issMarker = L.marker([lat, lon], {icon: icon}).addTo(map)
        } else {issMarker.setLatLng([lat, lon])}
    }).catch(err => {
        console.log('ERROR', err)
        attempts -= 1
    })
    .finally(() => setTimeout(iss, update, attempts))
}
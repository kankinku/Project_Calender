window.onload = function() {
  var apiKey = 'fe42816090f5641c971c8fd148f55a7b';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  }
  
  // 위치 정보에 성공적으로 접근했을 때 실행되는 함수입니다.
  function showPosition(position) {
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    console.log("사용자의 위도: " + x + ", 경도: " + y);
     
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=` + apiKey ;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var city = data.name;
        var temp = data.main.temp;
        var description = data.weather[0].description;

        document.getElementById('city').innerHTML = 'city: ' + city;
        document.getElementById('temp').innerHTML =  Math.round(temp - 273.15) + '°C';
        document.getElementById('description').innerHTML = 'weather: ' + description;
    })
    .catch(err => {
        console.log(err);
    });
  }

  // 위치 정보에 접근하는 데 실패했을 때 실행되는 함수입니다.
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("사용자가 위치 정보에 대한 요청을 거부하였습니다.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("위치 정보에 접근할 수 없습니다.");
        break;
      case error.TIMEOUT:
        console.log("위치 정보 요청 시간이 초과되었습니다.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("알 수 없는 오류가 발생했습니다.");
        break;
    }
  }
}

const city = 'seoul'; // 날씨 정보를 가져올 도시를 입력하세요.
window.addEventListener('DOMContentLoaded', () => {
  var apiKey = 'fe42816090f5641c971c8fd148f55a7b';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp.toFixed(1);

      document.getElementById('city2').innerHTML = `city: ${city}`;
      document.getElementById('temp2').innerHTML = temperature + '°C';
      document.getElementById('description2').innerHTML = 'weather: ' + weatherDescription;
    })
    .catch(error => {
      console.log('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    });
});
const newPlaceModal = document.getElementById('newPlaceModal')
const openPlaceBtn = document.getElementById('plus')
const createBtn = document.getElementById('create')
const cancelBtn = document.getElementById('cancel')

function openWeatherModal() {
  newPlaceModal.style.display = "block"
}

function closeWeatherModal() {
  newPlaceModal.style.display = "none"
}

openPlaceBtn.addEventListener('click', () => {
  openWeatherModal()
})

createBtn.addEventListener('click', () => {
  const provinceSelect = document.getElementById("province");
  const city = provinceSelect.value; // 날씨 정보를 가져올 도시를 입력하세요.
  const apiKey = 'fe42816090f5641c971c8fd148f55a7b';
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp.toFixed(1);

      document.getElementById('city2').innerHTML = `city: ${city}`;
      document.getElementById('temp2').innerHTML = temperature + '°C';
      document.getElementById('description2').innerHTML = 'weather: ' + weatherDescription;
    })
    .catch(error => {
      console.log('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    });

  closeWeatherModal()
})

cancelBtn.addEventListener('click', () => {
  closeWeatherModal()
})
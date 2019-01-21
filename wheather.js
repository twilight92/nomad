const wheather = document.querySelector(".js-wheather");
const API_KEY = "302b771fdbe8151a067cd39b717a9fc4";
const COORDS = "coords";

function getWheather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      wheather.innerText = `${temperature} @ ${place}`;
    });
  /*
		fetch 안에는 가져올 데이터가 들어가면 된다.(앞에 https://넣어줄 것)
		주의 : 따옴표가 아닌 backtic(`)을 사용할 것
		fetch안에 들어간 것은 
		https://openweathermap.org/api에서 Current weather data의 API doc클릭
		By geographic coordinates의 API call 내용 

		apiid에는 
		https://home.openweathermap.org/에서 sign in시 
		발급받는 API keys 넣어준다.

		이렇게하면 API를 제공하는 쪽에서
		요청자의 API Key를 통해서, 네가 무슨 상남자마냥 빡세게 요청하지는 않는지 알 수 있다.

		다 꽁짜기 때문에 자기들 서버에 무리가 갈 만큼 마냥 사용하게 해 줄 수는 없기 때문.

		이제 브라우저로 넘어와서 network 탭으로 이동한 다음에 새로고침

		temp를 바꾸고 싶어서 api doc에서 units format을 확인한 다음
		or temperature in Celsius use units=metric 이란 정보를 얻음

		then() - 데이터가 우리에게 넘어왔을 때 호출
		왜냐면 데이터가 들어오는데 시간이 좀 걸리는 경우가 있기 때문
		then이 하는 역할은 기본적으로 함수를 호출하는데 있지만 데이터가 완전히 들어온 다음 호출

		response는 네트워크 정보만 보임 body안에 들은 내용물은 볼 수가 없다.
		필요한건 body안에 들은 내용물

		console.log(reponse.json)이 뜨는데
		Promise {<pending>}이 나온다 이는 가져온 데이터를 처리 중이라는 뜻
		그래서 한번 더 then으로 감싼다.
	*/
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
    //ES6 key와 value값이 일치할 경우 이렇게 작성해도 된다
    //latitude : latitude,
    //longitude : longitude
  };
  saveCoords(coordsObj);
  getWheather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geolocation");
}

function askForCoorde() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoorde();
  } else {
    const pareseCoords = JSON.parse(loadedCords);
    getWheather(pareseCoords.latitude, pareseCoords.longitude);
    //getWeather();
  }
}

function init() {
  loadCoords();
}

init();

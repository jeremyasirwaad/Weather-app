window.addEventListener("load",()=>{
  let long;
  let lat;
  let timezone = document.querySelector('.location-timezone');
  let degree = document.querySelector('.degree');
  let unit = document.querySelector('.unit');
  let content = document.querySelector('.content');
  let logo = document.querySelector('.logo');
  let container = document.querySelector('.celcius');

  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long , lat);

      const api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0f887b2d6e5b24ed658f2770ebc66eb4`
      fetch(api)
        .then(Response =>
        {
          return Response.json();
        })
        .then(data => {
          console.log(data);
          const{name} = data;
          const{temp} = data.main;
          let tempinfaren = Math.round(((temp-273.15) * 1.8) + 32);
          const{description , icon} = data.weather[0];
          degree.textContent = tempinfaren;
          content.textContent = description;
          timezone.textContent = name;
          logo.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
          let tempincel = Math.round((tempinfaren - 32) * 0.5555);
          container.addEventListener('click', ()=>{
            if(unit.textContent === 'F')
            {
              unit.textContent = "C";
              degree.textContent = tempincel;
            }
            else{
              unit.textContent = "F";
              degree.textContent = tempinfaren;
            }
        })
        });
    });
  }
  else
  {
    alert("Please Allow geo Location");
  }
})

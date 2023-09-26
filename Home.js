fetch("./data.json")
  .then((response) => response.json())
  .then((dati) => {
    const games = structuredClone(dati);
    const arrayGames = games.results;


    console.log(arrayGames);
    let totalGames = document.querySelector('#totalGames');
    totalGames.textContent = arrayGames.length;

    let generi = [];

    arrayGames.forEach(gioco => {
      gioco.genres.forEach(obj => {
        generi.push(obj.name)
      })
    });

    let totalGenres = document.querySelector('#totalGenres');
    totalGenres.textContent = new Set(generi).size;

    let piattaforme = [];
    arrayGames.forEach(gioco => {
      gioco.platforms.forEach(piattaforma => {
        piattaforme.push(piattaforma.platform.name)
      })
    })

    let totalPlatforms = document.querySelector('#totalPlatforms');
    totalPlatforms.textContent = new Set(piattaforme).size

    let mappingCardContent = arrayGames.map((game) => {
      return [game.name, game.background_image, new Date(game.released)]
    }).sort((a, b) => b[2] - a[2]).slice(0, 4)


    let gameCardWrapper = document.querySelector('#gameCardWrapper');
    mappingCardContent.forEach(element => {
      let div = document.createElement('div')
      div.classList.add('col-12', 'col-md-3', 'mb-3')
      div.innerHTML = `     
      <div class="cardUltimi h-100 d-block mx-auto m-5 pb-3" style="width: 18rem;">
      <h3 class="font-p normal-text p-3 t-color">${element[0].length < 10 ? element[0] : element[0].substring(0, 12) + "[...]"}</h3>
        <img src="${element[1]}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="p-3">
            <img class="pt-2" src="./media/play-station.png" alt="">
            <img class="pt-2" src="./media/windows.png" alt="">
            <img class="pt-2" src="./media/xbox-30.png" alt="">
            </div>
            <div>
              <hr>
              <div class="d-flex justify-content-between align-items-center p-3">
                <p class="font-s normal-text acc">Released:</p>
                <p class="font-s normal-text">${element[2].toLocaleDateString("it-IT")}</p>
                </div>
                <button class="bg-transparent border border-0 font-s normal-text"><a>Play now</a></button>
                </div>
                </div>
                </div>            
                `
      div.classList.add('scaleUp')
      gameCardWrapper.appendChild(div)
    })


  })




  /*Countdown*/
  (function () {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "09/30/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {

        const now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "It's my birthday!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
    
  }());







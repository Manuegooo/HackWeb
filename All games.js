fetch("./data.json")
    .then((response) => response.json())
    .then(games => {
        const result = games.results
        console.log(result);

        const searchElement = document.querySelector('#searchElement');
        const gamesWrapper = document.querySelector('#gamesWrapper');
        const genresWrapper = document.querySelector('#genresWrapper');

        searchElement.placeholder = `🔎 Search between ${result.length} name of games...`

        function searchByName(array, nameGame) {
            const filtro = array.filter(game => {
                return game.name.match(new RegExp(nameGame, "gi"))
            })
            return filtro;
        }

        searchElement.addEventListener('input', () => {
            showGames(searchByName(result, searchElement.value))
        })

        let genres = Array.from(new Set(result.map(el => el.genres)
            .map(el => el.map(el => el.name)).flat()))

        genres.forEach(genresElement => {
            let option = document.createElement('option')
            option.setAttribute("id", genresElement)
            option.setAttribute("value", genresElement)
            option.dataset.categoria = "categoria"
            option.innerHTML = `${genresElement}`
            genresWrapper.appendChild(option)
        })

        let categoriaElement = document.querySelectorAll('[data-categoria]')
        categoriaElement.forEach(categoriaOption => {
            categoriaOption.addEventListener('click', () => {
                showGames(searchByCategory(result, categoriaOption.id))
            })
        })

        function searchByCategory(array, category) {
            const filtro = array.filter(game => {
                return game.genres.find(el => el.name == category)
            })
            return filtro;
        }

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

        async function showGames(array) {
            await sleep(1000)
            gamesWrapper.innerHTML = "";
            array.forEach(gameElement => {
                let div = document.createElement('div')
                div.classList.add("col-12", "col-md-3", "mb-5")
                div.innerHTML = `
                <div class="cardUltimi d-block mx-auto pb-3 h-100" style="width: 18rem;">
                <h3 class="font-p normal-text p-3">${gameElement.name.length < 10 ? gameElement.name : gameElement.name.substring(0, 19) + "[...]"}</h3>
                <img src="${gameElement.background_image}" style="height:150px" class="card-img-top rounded-0" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                <div class="p-3">
                <img class="pt-2" src="./media/play-station.png" alt="">
                <img class="pt-2" src="./media/windows.png" alt="">
                <img class="pt-2" src="./media/xbox-30.png" alt="">
                </div>
                <div>
                <hr>
                <div class="d-flex justify-content-between align-items-center m-3">
                <p class="font-s normal-text acc">Released:</p>
                <p class="font-s normal-text">${gameElement.released}</p>
                </div>
                <button class="bg-transparent border border-0 font-s normal-text"><a>Play now</a></button>
                </div>
                </div>
                </div>            
                `
                gamesWrapper.appendChild(div)

            });
        }


        showGames(result)
    })




fetch("./data.json")
    .then((response) => response.json())
    .then(data => {
        const result = data.results;
        console.log(result);
        function getGame(name) {
            return result.find(game => game.name == name)
        }



        const detail = getGame("Ooblets");
        console.log(detail)

        let bgGame = document.querySelector('#bg-game');
        let title = document.querySelector('#title')
        title.textContent = detail.name
        let playtime = document.querySelector('.playtime')
        playtime.textContent = `Review rilasciate: ${detail.reviews_count}`

        const iconsPlatforms = document.querySelector('#iconsPlatforms');
        if (detail.platforms.some(el => el.platform.name == "PC")) {
            let img = document.createElement('img')
            img.src = "./media/windows.png"
            iconsPlatforms.appendChild(img)
        }
        if (detail.platforms.some(el => el.platform.name == "PlayStation 5" || el.platform.name == "PlayStation 4")) {
            let img = document.createElement('img')
            img.src = "./media/play-station.png"
            iconsPlatforms.appendChild(img)
        }
        if (detail.platforms.some(el => el.platform.name == "Xbox One" || el.platform.name == "Xbox Series S/X")) {
            let img = document.createElement('img')
            img.src = "./media/xbox-30.png"
            iconsPlatforms.appendChild(img)
        }
        if (detail.platforms.some(el => el.platform.name == "Nintendo Switch")) {
            let img = document.createElement('img')
            img.src = "./media/nintendo-switch.png"
            iconsPlatforms.appendChild(img)
        }


        let imgGame = document.querySelector('#imgGame');
        imgGame.src = detail.background_image

        let screenShotsWrapper = document.querySelector('#screenShotsWrapper');
        const screenshots = detail.short_screenshots.map(el => el.image).slice(3, 5)
        screenshots.forEach(screen => {
            let div = document.createElement('div')
            div.classList.add('col-6', 'mb-3')
            div.innerHTML = `
        
        <img src="${screen}" class="img-fluid">
        
        `
            screenShotsWrapper.appendChild(div)
        });


        let rating = document.querySelector('#rating');
        let playTime = document.querySelector('#playtime');
        let counts = document.querySelector('#counts');
        let update = document.querySelector('#updated');
        let geners = document.querySelector("#genres");

        rating.textContent = detail.rating
        playTime.textContent = detail.playtime
        counts.textContent = detail.ratings_count
        update.textContent = new Date(detail.updated).toLocaleDateString("it-IT")
        geners.textContent = detail.genres.map(el => el.name)

        const dataToChart = detail.ratings.map(el => {
            return {
                category: el.title,
                value: el.percent
            }
        })


        am5.ready(function () {
            var root = am5.Root.new("chartdiv");
            root._logo.dispose();
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            var chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    endAngle: 270,
                    radius: am5.percent(75),
                })
            );

            var series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "value",
                    categoryField: "category",
                    endAngle: 270,
                    name: "Series",
                    alignLabels: false
                })
            );

            series.get("colors").set("colors", [
                am5.color("#66FCF1"),
                am5.color("#46A29F"),
                am5.color("#C5C6C7")
            ]);

            series.states.create("hidden", {
                endAngle: -90
            });

            series.labels.template.setAll({
                text: "{category}",
                textType: "circular",
                inside: true,
                radius: 5,
                fill: am5.color("#000")
            });


            series.data.setAll(dataToChart);

            series.appear(1000, 100);

        }); // end am5.ready()




    })
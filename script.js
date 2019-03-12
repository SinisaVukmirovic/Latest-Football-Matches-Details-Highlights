// getting the DOM elements
let matches = document.querySelector('.matches');
let leagues = document.querySelectorAll('.leagues div');

leagues.forEach(league => {
    league.addEventListener('click', () => {
        
        let chosenLeague = league.getAttribute('data-league');

        const api = `https://www.scorebat.com/video-api/v1/`;
        
        fetch(api)
            .then(response => response.text())
            .then(apiData => {
                let data = JSON.parse(apiData);
            
                for (let i = 0; i < data.length; i++) {
                    
                    let comp = data[i].competition.name;

                    if (comp.includes(chosenLeague)) {

                        matches.innerHTML += `
                                                <div class="js-match">
                                                    <h4>${data[i].title}</h4>
                                                    <a href="${data[i].url}">Full Details & Highlights</a>
                                                </div>
                                            `;

                        matches.classList.add('chosen');

                        let chosenImage = chosenLeague.replace(/\W/g, '');

                        matches.style.backgroundImage = `url(img/bgs/${chosenImage}.jpg)`;
                        matches.style.backgroundSize = 'cover';
                        matches.style.backgroundPosition = 'center';

                        matches.addEventListener('click', () => {
                            matches.classList.remove('chosen');
                            matches.innerHTML = '';
                        });

                    }
                }
            })
            .catch(error => console.log(error)
        );

    });
});
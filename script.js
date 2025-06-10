const inputEl = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const emptyList = document.getElementById('empty-list')
const filmList = document.getElementById('film-list')

const filmArray = []

searchBtn.addEventListener('click', addMoviesToLocalArray)

function addMoviesToLocalArray(){
    emptyList.style.display = 'none'
    fetch(`http://www.omdbapi.com/?s=${inputEl.value}&type=movie&apikey=38e170a6`)
    .then(res => res.json())
    .then(data => { 
        searchArray = data.Search.slice(0,5)
        searchArray.forEach(function(film){
            fetch(`http://www.omdbapi.com/?t=${film.Title}&type=movie&apikey=38e170a6`)
                .then(response => response.json())
                .then(finf =>{
                    filmList.innerHTML += `
                    <div class="single-movie">
                        <div class="film-poster">
                            <img src="${finf.Poster}">
                        </div>
                        <div class="film-info">
                            <h3>${finf.Title}</h3>
                            <p>${finf.Rangetime}</p>
                            <p>${finf.Genre}</p>
                            <button id="watchlist-btn">Watchlist</button>
                            <p>${finf.Plot}</p>
                        </div>
                    </div>
                    <hr>
                    `
                })
            })
        })
}
     
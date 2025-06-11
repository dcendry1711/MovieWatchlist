const inputEl = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const emptyList = document.getElementById('empty-list')
const filmList = document.getElementById('film-list')

const selectedMoviesArr = []

searchBtn.addEventListener('click', renderSearchMovies)

function renderSearchMovies(){
    filmList.innerHTML = ''
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
                            <img src="${finf.Poster}" id="poster">
                        </div>
                        <div class="film-info">
                            <div class="film-head">
                                <h3>${finf.Title}</h3>
                                <div class="rating-section">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <p>${finf.imdbRating}</p>
                                </div>
                            </div>
                            <div class="film-body">
                                <p>${finf.Runtime}</p>
                                <p>${finf.Genre}</p>
                                <div class="watchlist-section">
                                    <button id="watchlist-btn" data-movie="${finf.Title}">+</button>
                                    <p>Watchlist</p>
                                </div>
                            </div>
                            <p id="plot">${finf.Plot}</p>
                        </div>
                    </div>
                    `
                })
            })
        })
}

document.addEventListener('click', function(e){
    if(e.target.id === 'watchlist-btn'){
        selectedMoviesArr.push(e.target.dataset.movie)
        console.log(selectedMoviesArr)
        localStorage.setItem("movies", JSON.stringify(selectedMoviesArr))
    }
})
const inputEl = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const emptyList = document.getElementById('empty-list')
const filmList = document.getElementById('film-list')

const selectedMoviesArr = []

searchBtn.addEventListener('click', renderSearchMovies)

function renderSearchMovies(){
    filmList.innerHTML = ''
    emptyList.style.display = 'none'
    fetch(`https://www.omdbapi.com/?s=${inputEl.value}&type=movie&apikey=38e170a6`)
    .then(res => res.json())
    .then(data => { 
        searchArray = data.Search.slice(0,5)
        searchArray.forEach(function(film){
            fetch(`https://www.omdbapi.com/?t=${film.Title}&type=movie&apikey=38e170a6`)
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
                                    <button id="watchlist-btn" data-movie="${finf.Title}" class="">+</button>
                                    <p id="${finf.Title}">Watchlist</p>
                                </div>
                            </div>
                            <p id="plot">${finf.Plot}</p>
                        </div>
                    </div>
                    `
                })
                
            })
        })
    .catch(error => {
        filmList.innerHTML = `<h2 id="error-message">Unable to find what you're looking for.<br>Please try another search.</h2>`
    })
}

document.addEventListener('click', function(e){
    if(e.target.id === 'watchlist-btn'){
        document.getElementById(e.target.dataset.movie).textContent = 'Added to list'
        if (!selectedMoviesArr.includes(e.target.dataset.movie))
        selectedMoviesArr.push(e.target.dataset.movie)
        localStorage.setItem("movies", JSON.stringify(selectedMoviesArr))
    }
})
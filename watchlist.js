const emptyWatchlist = document.getElementById('empty-watchlist')
let watchlistArr = JSON.parse(localStorage.getItem("movies"))
const filmList = document.getElementById('film-list')

document.addEventListener('click',function(e){
    console.log(e.target.dataset.movie)
    if (e.target.dataset.movie){
       //tutaj trzeba usunąć wybrany film z listy
    }
})


function renderWatchlist(){
    if (watchlistArr.length>0){
        emptyWatchlist.style.display = 'none'
        watchlistArr.forEach(function(film){
            fetch(`http://www.omdbapi.com/?t=${film}&type=movie&apikey=38e170a6`)
                .then(res => res.json())
                .then(film => {
                    filmList.innerHTML += `
                    <div class="single-movie">
                        <div class="film-poster">
                            <img src="${film.Poster}" id="poster">
                        </div>
                        <div class="film-info">
                            <div class="film-head">
                                <h3>${film.Title}</h3>
                                <div class="rating-section">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <p>${film.imdbRating}</p>
                                </div>
                            </div>
                            <div class="film-body">
                                <p>${film.Runtime}</p>
                                <p>${film.Genre}</p>
                                <div class="remove-section">
                                    <button id="remove-btn" data-movie="${film.Title}">-</button>
                                    <p>Remove</p>
                                </div>
                            </div>
                            <p id="plot">${film.Plot}</p>
                        </div>
                    </div>
                    `
                })
        })
    }
}           

renderWatchlist()

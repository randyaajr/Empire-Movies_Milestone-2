//The user submit/input section
$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

//Here is where the data is fetched from the API.  
function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=769176e7')
        .then(function(response) {
            console.log(response);
            //Array data will be placed inside this variable.
            let movies = response.data.Search;
            //Each movie will be appended to this variable and then outputted to the screen.
            let output = '';
            //jQuery .each loop will loop through each movie.
            $.each(movies, function(index, movie) {
                output += `
                <div class="col-sm">
                  <div class="film-cards text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <hr>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div>
              `;
            });

            $('#movies').html(output);
        })
        .catch(function(err) {
            console.log(err);
        });
}

//*****************************************************************************************Movie page

/*
Session storage is used here because it clears when the browser is closed after use. This function will then 
open up movie.html
*/
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

//This fuction takes the movie from sessionStorage and display the information on the screen.
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    // Makes a request for th user, with the id of the selected movie
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817") //New key needed
        .then(function(response) {
            let movie = response.data;
            console.log(movie); //(For debugging reasons)

            //Output section which will populate movie.html will requested film data
            let output = `
            <div class="container mx-auto">
              <div class="row mt-5">
                <div class="col-sm">
                  <img class="img-thumbnail" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                </div>  
                <div class="col-md-8">
                  <h2>${movie.title}</h2>
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                    <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                    <li class="list-group-item"><strong>Production Co:</strong> ${movie.production_companies[0].name} min.</li>
                  </ul>
                </div>
              </div>
            </div>  
              <div class="row">
                <div class="film-con">
                  <h3>Plot</h3>
                  ${movie.overview}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                  <a href="index.html" class="btn btn-light">Go Back To Search</a>
                </div>
              </div>
      `;
            $('#movie').html(output);
        })


    .catch(function(error) {
        console.log(error);
    });
}
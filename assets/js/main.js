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
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=thewdb')
        .then(function(response) {
            console.log(response);
            //Array data will be place inside this variable.
            let movies = response.data.Search;
            //Each movie will be appended to this variable and then outputted to the screen.
            let output = '';
            //jQuery .each loop will loop through each movie.
            $.each(movies, function(index, movie) {
                output += `
                <div class="col-md-3">
                  <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
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
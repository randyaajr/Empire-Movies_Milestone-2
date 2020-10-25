//The user submit/input section
$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

//Here is where the data is fetched. 
function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=thewdb')
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });
}
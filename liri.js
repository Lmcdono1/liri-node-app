require("dotenv").config();
//Accessing Spotify Package
var Spotify = require('node-spotify-api');
//Getting API keys
var keys = require('./keys')
//console.log(keys);
//Accessing OMDB and Bands in Town
var request = require('request');

//Reading and writing files
var fs = require("fs");
//setting up argument
var liriApp = process.argv[2];

//Switch case so the user can jump from the different functions
switch(liriApp) {
    case "spotify-this-song": songSearch(); 
    break;
    
    case "movie-this": movieSearch();
    break;
    
    case "concert-this": bandSearch();
    break;
};


//SPOTIFY________________________________________
// node liri.js spotify-this-song '<song name here>'
// Show Artist
// Show song's name
// Show preview link of the song from Spotify
// The album that the song is from

//if no song provided, default to "The Sign" by Ace of Base

function songSearch(){
var songSearch = process.argv[3]; 

params = songSearch;

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

// var queries = {spotify_this_song: function (altQuery){
//     if (process.argv[3]== ""){
//         altQuery = "The Sign"
//     }
    spotify.search({ type: 'track', query: songSearch }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      var songs = data.tracks.items
      console.log(songs[0].artists[0].name[0]);

      //console.log(songs);
      for (var i = 0; i < 100; i++){
        if (songs[i] != undefined){
        //console.log(songs[i].artists[0].name + " - " + songs[i].artists[0].name);
        var showSongResults = 
        "Artist: " + songs[i].artists[0].name + "\n" +
        "Song name: " + songs[i].name + "\n" +
        "Preview Link: " + songs[i].preview_url + "\n" + 
        "Album: " + songs[i].album.name + "\n"
        }
      }
      console.log(showSongResults); 
      });

    };
//queries.spotify_this_song();


// if (liriApp === "spotify-this-song"){
//     queries.spotify_this_song();
// }


//songSearch();


//OMDB___________________________________________
// node liri.js movie-this '<movie name here>'
//Output 
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

function movieSearch(){
    var movieSearch = process.argv[3];
    params = movieSearch;
   // var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        // if (error) {
        //     return console.log('Error occurred: ' + error);
        if (!error && response.statusCode == 200) {
			    var movieName = JSON.parse(body);
				//console.log(movieName); 
				var showMovieResults =
				"Title: " + movieName.Title+"\n"+
				"Year: " + movieName.Year+"\n"+
                "Imdb Rating: " + movieName.imdbRating+"\n"+
				"Country: " + movieName.Country+"\n"+
				"Language: " + movieName.Language+"\n"+
				"Plot: " + movieName.Plot+"\n"+
				"Actors: " + movieName.Actors+"\n"+
			
                console.log(showMovieResults);
                //console.log(showMovieResults);
                
            } else {
				console.log("Error :"+ error);
				return;
        };       
        
});

};
// movieSearch();


//BANDS IN TOWN___________________________________
//node liri.js concert-this <artist/band name here>
//Show name of venue
//Show venue location
//Show date of the Event (MM/DD/YYY)
function bandSearch(){
    var bandSearch = process.argv[3];
    params = bandSearch;
    //var queryUrl = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=eyJUb2tlblR5cGUiOiJBUEkiLCJzYWx0IjoiYmRhNWVkN2QtMDA5My00NDQ3LTg5NTMtNTllZmY0ZWM4YWYzIiwiYWxnIjoiSFM1MTIifQ.eyJqdGkiOiI4NjZkNTRkNC0yMWY0LTQ4NzctYTQyMC01YjQ3NGUzNjkxYTciLCJpYXQiOjE1MzY3MTQ2MTB9.n__CSZccZMscIhKk4kFjpwRHX-l2-3-fFsP-E1x0XZLppEjFZHVSB3LrRJ3DVdr-p5OdbeJPICqGBWntfwvyfw";
    
    request("https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp", function (error, response, body){
    if (!error && response.statusCode == 200) {
        var bandName = JSON.parse(body);
        //console.log(bandName); 
            var showBandResults =
            "Venue: " + bandName[0].venue.name+"\n"+
            "Location: " + bandName[0].venue.city+"\n"+
            "Date of Event: " + bandName[0].datetime+"\n";
            console.log(showBandResults);

    } else {
        console.log("Error :"+ error);
        return;
};

});
    
    
    // request(queryUrl, function(err, res, body) {
    //   console.log(JSON.parse(body).Released);
    // });

};

// bandSearch();

//DO WHAT IT SAYS___________________________________
// node liri.js do-what-it-says

// function doWhatItSays(){

// 
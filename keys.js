console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };

// exports.OMDb = {
//     apiKey: process.env.OMDB_ID,
// }

exports.BandsinTown = {
    apiKey: process.env.BANDSINTOWN_ID,
}

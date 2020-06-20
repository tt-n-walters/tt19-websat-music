const axios = require("axios");
const express = require("express");


const id = "9dd4ddc3546743a7ba79f561d227a93e";
const secret = "c2d604e429114d9499144be4f9ddff97";
const token = {};

function authenticate() {
    const authString = id + ":" + secret;
    const buffer = Buffer.from(authString);
    const encoded = buffer.toString("base64");

    const endpoint = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    let request = axios({
        method: "post",
        url: endpoint,
        data: params,
        headers: {
            Authorization: "Basic " + encoded
        }
    });

    let authPromise = new Promise(resolve =>
        request.then(response => {
            token.access = response.data.access_token;
            token.timeLimit = Date.now() + response.data.expires_in * 1000;
            resolve(token);
        })
    );

    return authPromise;
}

function searchArtist(artist) {
    const endpoint = "https://api.spotify.com/v1/search";

    let request = axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            q: artist,
            type: "artist"
        }
    })
    
    let dataPromise = new Promise(resolve =>
        request.then(response => {
            resolve(response.data);
        })
    );
    return dataPromise;
}

function searchTrack(track) {
    const endpoint = "https://api.spotify.com/v1/search";

    let request = axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            q: track,
            type: "track"
        }
    })
    
    let dataPromise = new Promise(resolve =>
        request.then(response => {
            resolve(response.data);
        })
    );
    return dataPromise;
}

function getRecommendations(artists, tracks) {
    const endpoint = "https://api.spotify.com/v1/recommendations";

    let artistParameter = artists.join(",");
    let trackParameter = tracks.join(",");

    let request = axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            seed_artists: artistParameter,
            seed_tracks: trackParameter
        }
    });

    let dataPromise = new Promise(resolve =>
        request.then(response => {
            resolve(response.data);
        })
    );
    return dataPromise;
}

authenticate().then(token => getRecommendations(["1dfeR4HaWDbWqFHLkxsg1d"], []));







/******************************************** */
/*                                            */
/*         EXPRESS SERVER CODE                */
/*                                            */
/******************************************** */

const app = express();
app.use(express.static(__dirname + "/static"));


app.get("/index.html", function(request, response) {
    response.sendFile("index.html", { root: __dirname });
});


app.get("/artist", function(request, response) {
    let artist = request.params.get("name")

    searchArtist(artist).then(data => {
        response.send(data);
    })
})


app.get("/track", function(request, response) {
    
})


app.get("/recommendations", function(request, response) {
    
})


let port = 53848;
app.listen(port)


// sebastian 53849
// roberto 53850
// irene 53851
// bruno 53852
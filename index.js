const axios = require("axios");

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

    axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            q: artist,
            type: "artist"
        }
    }).then(response => {
        console.log(response.data);
    });
}

function searchTrack(track) {
    const endpoint = "https://api.spotify.com/v1/search";

    axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            q: track,
            type: "track"
        }
    }).then(response => {
        console.log(response.data);
    });
}

function getRecommendations(artists, tracks) {
    const endpoint = "https://api.spotify.com/v1/recommendations"

    let artistParameter = artists.join(",");
    let trackParameter = tracks.join(",");

    axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: "Bearer " + token.access
        },
        params: {
            seed_artists: artistParameter,
            seed_tracks: trackParameter
        }
    })
}

authenticate().then(token => searchArtist("Queen"));

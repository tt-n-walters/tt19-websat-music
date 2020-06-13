const axios = require("axios");

const id = "9dd4ddc3546743a7ba79f561d227a93e";
const secret = "";

function authenticate() {
    const authString = id + ":" + secret;
    const buffer = Buffer.from(authString);
    const encoded = buffer.toString("base64");

    const endpoint = "https://accounts.spotify.com/api/token";

    axios({
        method: "post",
        url: endpoint,
        data: {
            grant_type: "client_credentials"
        },
        headers: {
            Authorization: "Basic " + encoded
        }
    }).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
}

authenticate();

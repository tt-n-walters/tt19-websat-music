const axios = require("axios");

const id = "9dd4ddc3546743a7ba79f561d227a93e";
const secret = "";

function authenticate() {
    const authString = id + ":" + secret;
    const buffer = Buffer.from(authString);
    const encoded = buffer.toString("base64");

    const endpoint = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    axios({
        method: "post",
        url: endpoint,
        data: params,
        headers: {
            Authorization: "Basic " + encoded
        }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error.response.data);
    })
}

console.log(authenticate());

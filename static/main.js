let input, searches, tracks;

let artistIds = [];

function setup() {
    input = document.getElementById("input");
    searches = document.getElementById("searches");
    tracks = document.getElementById("tracks");

    input.addEventListener("keypress", handleKeypress);
}

function handleKeypress(event) {
    if (event.code == "Enter") {
        let artist = input.value;
        let url = "artist?name=" + artist;
        fetch(url)
            .then(blob => blob.json())
            .then(json => {
                data = json.artists.items[0];
                displaySearch(data);
            });
    }
}

function displaySearch(data) {
    let item = document.createElement("li");
    item.innerText = data.name + " ::: " + data.external_urls.spotify;
    searches.appendChild(item);

    artistIds.push(data.id);
}

function recommendations() {
    url = "recommendations?artists=" + artistIds + "&tracks=[]"
    fetch(url).then(blob => blob.json()).then(console.log)
}

window.addEventListener("load", setup);

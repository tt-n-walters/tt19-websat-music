let input, searches, tracks;

function setup() {
    input = document.getElementById("input");
    searches = document.getElementById("searches");
    tracks = document.getElementById("tracks");

    input.addEventListener("keypress", handleKeypress);
}

function handleKeypress(event) {
    if (event.code == "Enter") {
        let artist = input.value;
        let url = "/artist?name=" + artist;
        fetch(url)
            .then(blob => blob.json())
            .then(json => {
                data = json.artists.items[0];
                displaySearch(data);
            });
    }
}

function displaySearch(data) {
    
}

window.addEventListener("load", setup);

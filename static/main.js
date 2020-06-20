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
        let url = "/artist?name=" + artist
        
    }
}


window.addEventListener("load", setup);


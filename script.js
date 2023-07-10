const input = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn');
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleElement = document.getElementById("title");
const meaningElement = document.getElementById("meaning");
const audioElement = document.getElementById("audio");

async function fetchAPI(word) {
try {
    infoText.style.display = 'block';
    meaningContainer.style.display = 'none';
    infoText.innerText = `Searching for the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result = await fetch(url).then((res) => res.json())
    if(result.title) {
        meaningContainer.style.display = 'block'
        infoText.style.display = 'none'
        titleElement.innerText = word;
        meaningElement.innerText = `No results found for ${word}`;
        audioElement.style.display = "none";
    } else {
        infoText.style.display = 'none';
        meaningContainer.style.display = 'block';
        audioElement.style.display = 'inline-flex';
        titleElement.innerText = result[0].word;
        meaningElement.innerText = result[0].meanings[0].definitions[0].definition;
        audioElement.src = result[0].phonetics[0].audio;
    }
    
    //infoText.innerText = `Type a word and press enter`
} catch (error) {
    infoText.innerText = `An error occured, please try again`;
}    
}
input.addEventListener("keyup", (e) => {
    if(e.target.value && e.key ==="Enter") {
        fetchAPI(e.target.value);
    }
})

searchBtn.addEventListener("click", () => {
    const word = input.value.trim();
    if (word) {
        fetchAPI(word);
    }
});
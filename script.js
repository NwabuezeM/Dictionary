const input = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn');
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleElement = document.getElementById("title");
const meaningElement = document.getElementById("meaning");
const audioElement = document.getElementById("audio");
const partOfSpeech = document.getElementById("part-of-speech");
const exampleElement = document.getElementById("example");
const partOfSpeechText = document.getElementById("part-of-speech-text");
const exampleText = document.getElementById("example-text");

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
            partOfSpeech.style.display = 'none';
            meaningElement.innerText = `No results found for ${word}`;
            audioElement.style.display = "none";
            exampleElement.style.display = "none";
        } else {
            infoText.style.display = 'none';
            meaningContainer.style.display = 'block';
            partOfSpeech.style.display = 'inline-flex';
            audioElement.style.display = 'inline-flex';
            exampleElement.style.display = "inline-flex";
            titleElement.innerText = result[0].word;
            partOfSpeechText.innerText = `: ${result[0].meanings[0].partOfSpeech}`;
            meaningElement.innerText = result[0].meanings[0].definitions[0].definition;
            audioElement.src = result[0].phonetics[0].audio;
            exampleText.innerText = `: ${result[0].meanings[0].definitions[0].example}`;
        }
        if(result[0].meanings[0].definitions[0].example === undefined) {
            exampleElement.style.display = "none";
        }
        input.value = '';
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
    input.value = '';
});

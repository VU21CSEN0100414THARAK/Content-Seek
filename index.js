let currentUtterance = null;
let femaleVoice = null;

function getFemaleVoice() {
    return new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                resolve(voices.find(voice => voice.name.toLowerCase().includes('female')));
            };
        } else {
            resolve(voices.find(voice => voice.name.toLowerCase().includes('female')));
        }
    });
}

async function fetchAndSpeakDescription(query) {
    try {
        const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const description = data.extract || `No description found for ${query}`;
        typeWriterEffect(description, 'definition-box');
        speakResults(description);
    } catch (error) {
        console.error('Error fetching description:', error);
        speakResults('Unable to fetch description. Please try again.');
    }
}

async function speakResults(text) {
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    femaleVoice = await getFemaleVoice();
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('query').value = transcript;
        document.getElementById('query-form').dispatchEvent(new Event('submit'));
    };
    recognition.start();
}

function toggleVoiceOutput() {
    if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        currentUtterance = null;
        document.querySelector('.voice-control-button').innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        speakResults(document.getElementById('definition-box').textContent);
        document.querySelector('.voice-control-button').innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function typeWriterEffect(text, elementId, speed = 50) {
    const element = document.getElementById(elementId);
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

function clearPreviousResults() {
    document.getElementById('links-list').innerHTML = '';
    document.getElementById('image-container').innerHTML = '';
}

function searchSpecificType(type) {
    const query = document.getElementById('query').value.trim();
    if (!query) {
        alert('Please enter some text.');
        return;
    }
    clearPreviousResults();
    search(query, type, 1, 4); // Fetching 40 results in 4 requests (10 each)
}

function search(query, fileType = '', start = 1, numRequests = 4) {
    const apiKey = 'AIzaSy.....9r7pq.......'; // Replace with your API key
    const searchEngineId = 'f1f04c.......'; // Replace with your Custom Search Engine ID
    let searchType = '';
    if (fileType === 'images') {
        searchType = '&searchType=image';
    } else if (fileType === 'ppt') {
        searchType = 'filetype:ppt';
    } else if (fileType === 'pdf') {
        searchType = 'filetype:pdf';
    }
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}+${searchType}&start=${start}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.items || [];
            if (fileType === 'images') {
                displayImages(items);
            } else {
                displayResults(items);
            }
            if (start / 10 < numRequests && data.queries.nextPage) {
                search(query, fileType, start + 10, numRequests);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

function displayResults(items) {
    const linksList = document.getElementById('links-list');
    if (items.length === 0 && !linksList.innerHTML) {
        linksList.innerHTML = '<li>No results found.</li>';
        return;
    }
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><br><small>${item.displayLink}</small><br><small>${item.snippet}</small>`;
        linksList.appendChild(listItem);
    });
}

function displayImages(items) {
    const imageContainer = document.getElementById('image-container');
    if (items.length === 0 && !imageContainer.innerHTML) {
        imageContainer.innerHTML = '<p>No images found.</p>';
        return;
    }
    items.forEach(item => {
        const imgElement = document.createElement('img');
        imgElement.src = item.link;
        imgElement.alt = item.title;
        imageContainer.appendChild(imgElement);
    });
}

document.getElementById('query-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (!query) {
        alert('Please enter some text.');
        return;
    }
    clearPreviousResults();
    fetchAndSpeakDescription(query);
    search(query, '', 1, 4); // Fetching 40 results in 4 requests (10 each)
});

anime.timeline()
.add({
    targets: '.ml5 .line',
    opacity: [0.5, 1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
}).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625 * 2 * i) + "em"
}).add({
    targets: '.ml5 .ampersand',
    opacity: [0, 1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
}).add({
    targets: '.ml5 .letters-left',
    opacity: [0, 1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
}).add({
    targets: '.ml5 .letters-right',
    opacity: [0, 1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
}).add({
    targets: '.ml5',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});

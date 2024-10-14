// script.js

async function fetchNews() {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=ng&apiKey=YOUR_API_KEY');
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error(error);
        // Display an error message to the user
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('a[href="#topNews"]').addEventListener('click', () => {
        clearSections();
        fetchNews('top', 'topNewsContainer');
    });
    document.querySelector('a[href="#technology"]').addEventListener('click', () => {
        clearSections();
        fetchNews('technology', 'technologyContainer');
    });
    document.querySelector('a[href="#sports"]').addEventListener('click', () => {
        clearSections();
        fetchNews('sports', 'sportsContainer');
    });
});

function clearSections() {
    document.getElementById('topNewsContainer').innerHTML = '';
    document.getElementById('technologyContainer').innerHTML = '';
    document.getElementById('sportsContainer').innerHTML = '';
}

async function fetchNews(category, containerId) {
    try {
        console.log(`Fetching ${category} news...`);
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_56417b5f748ed38a4503a1d4ab2a6804ca981&country=ng&category=${category}`);
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);
        displayNews(data.results, containerId);
    } catch (error) {
        console.error('An error occurred:', error.message);
        document.getElementById(containerId).innerHTML = `<p>An error occurred while fetching ${category} news: ${error.message}</p>`;
    }
}

function displayNews(articles, containerId) {
    const newsContainer = document.getElementById(containerId);
    newsContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p>No news available at the moment.</p>`;
        return;
    }

    articles.forEach(article => {
        console.log('Article:', article); // Log each article to see its structure
        const imageUrl = article.image_url || 'https://via.placeholder.com/150';
        const newsItem = document.createElement('div');
        newsItem.className = 'news-card';
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" target="_blank" class="read-more">Read More</a>
            <img src="${imageUrl}" alt="${article.title}" />
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Initial fetch
fetchNews('top', 'topNewsContainer');

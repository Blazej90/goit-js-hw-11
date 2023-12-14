import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const resultsContainer = document.getElementById('results');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const searchQuery = event.target.searchQuery.value;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea', // Zastąp 'TWÓJ_KLUCZ_PIXABAY' własnym kluczem
          q: searchQuery,
          per_page: 10, // Możesz dostosować ilość wyników
        },
      });

      const images = response.data.hits;
      displayResults(images);
    } catch (error) {
      console.error('Error during search:', error);
      resultsContainer.innerHTML =
        '<p>Error during search. Please try again later.</p>';
    }
  });

  function displayResults(images) {
    resultsContainer.innerHTML = '';

    if (images.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }

    images.forEach(image => {
      const imageElement = document.createElement('img');
      imageElement.src = image.previewURL;
      resultsContainer.appendChild(imageElement);
    });
  }
});

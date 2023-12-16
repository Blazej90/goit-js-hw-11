import axios from 'axios';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const galleryContainer = document.getElementById('gallery');
  const loadMoreButton = document.querySelector('.load-more');
  let currentPage = 1;
  let currentSearchQuery = '';

  const hideLoadMoreButton = () => {
    loadMoreButton.style.display = 'none';
  };

  const showLoadMoreButton = () => {
    loadMoreButton.style.display = 'block';
  };

  const displayNoResultsMessage = () => {
    hideLoadMoreButton();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
      { timeout: 4000 }
    );
  };

  const displayResults = images => {
    galleryContainer.innerHTML = '';

    if (images.length === 0) {
      displayNoResultsMessage();
      return;
    }

    images.forEach(image => {
      const imageElement = createImageElement(image);
      galleryContainer.appendChild(imageElement);
    });

    if (images.length < 40) {
      hideLoadMoreButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
        { timeout: 4000 }
      );
    } else {
      showLoadMoreButton();
    }
  };

  const appendResults = newImages => {
    if (newImages.length === 0) {
      displayNoResultsMessage();
      return;
    }

    newImages.forEach(image => {
      const imageElement = createImageElement(image);
      galleryContainer.appendChild(imageElement);
    });

    if (newImages.length < 40) {
      hideLoadMoreButton();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
        { timeout: 4000 }
      );
    } else {
      showLoadMoreButton();
    }
  };

  const createImageElement = image => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    const imageElement = document.createElement('img');
    imageElement.src = image.previewURL;
    imageElement.alt = image.tags;
    imageElement.loading = 'lazy';

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info');

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes:</b> ${image.likes || 0}`;

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views:</b> ${image.views || 0}`;

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments:</b> ${image.comments || 0}`;

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads:</b> ${image.downloads || 0}`;

    infoContainer.appendChild(likes);
    infoContainer.appendChild(views);
    infoContainer.appendChild(comments);
    infoContainer.appendChild(downloads);

    photoCard.appendChild(imageElement);
    photoCard.appendChild(infoContainer);

    return photoCard;
  };

  const loadMoreButtonClickHandler = async () => {
    currentPage += 1;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
          q: currentSearchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: currentPage,
        },
      });

      const newImages = response.data.hits;
      appendResults(newImages);
    } catch (error) {
      console.error('Error loading more images:', error);
      hideLoadMoreButton();
    }
  };

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    currentPage = 1;
    currentSearchQuery = event.target.searchQuery.value;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
          q: currentSearchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: currentPage,
        },
      });

      const images = response.data.hits;
      displayResults(images);
    } catch (error) {
      console.error('Error during search:', error);
      Notiflix.Notify.failure({
        message: 'Error during search. Please try again later.',
        timeout: 4000,
      });
      hideLoadMoreButton();
    }
  });

  loadMoreButton.addEventListener('click', loadMoreButtonClickHandler);
});

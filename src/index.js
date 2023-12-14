// import axios from 'axios';

// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const galleryContainer = document.getElementById('gallery');

//   searchForm.addEventListener('submit', async event => {
//     event.preventDefault();

//     const searchQuery = event.target.searchQuery.value;

//     try {
//       const response = await axios.get('https://pixabay.com/api/', {
//         params: {
//           key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
//           q: searchQuery,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,
//           per_page: 40,
//         },
//       });

//       const images = response.data.hits;
//       displayResults(images);
//     } catch (error) {
//       console.error('Error during search:', error);
//       alert('Error during search. Please try again later.');
//     }
//   });

//   function displayResults(images) {
//     galleryContainer.innerHTML = '';

//     if (images.length === 0) {
//       alert('No results found.');
//       return;
//     }

//     images.forEach(image => {
//       const photoCard = document.createElement('div');
//       photoCard.classList.add('photo-card');

//       const imgElement = document.createElement('img');
//       imgElement.src = image.webformatURL;
//       imgElement.alt = image.tags;
//       imgElement.loading = 'lazy';

//       const infoContainer = document.createElement('div');
//       infoContainer.classList.add('info');

//       const likesInfo = createInfoItem('Likes', image.likes);
//       const viewsInfo = createInfoItem('Views', image.views);
//       const commentsInfo = createInfoItem('Comments', image.comments);
//       const downloadsInfo = createInfoItem('Downloads', image.downloads);

//       infoContainer.appendChild(likesInfo);
//       infoContainer.appendChild(viewsInfo);
//       infoContainer.appendChild(commentsInfo);
//       infoContainer.appendChild(downloadsInfo);

//       photoCard.appendChild(imgElement);
//       photoCard.appendChild(infoContainer);

//       galleryContainer.appendChild(photoCard);
//     });
//   }

//   function createInfoItem(label, value) {
//     const infoItem = document.createElement('p');
//     infoItem.classList.add('info-item');
//     infoItem.innerHTML = `<b>${label}:</b> ${value}`;
//     return infoItem;
//   }
// });
// import axios from 'axios';

// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const galleryContainer = document.getElementById('gallery');
//   const loadMoreButton = document.querySelector('.load-more');
//   let currentPage = 1;
//   let currentSearchQuery = '';

//   searchForm.addEventListener('submit', async event => {
//     event.preventDefault();
//     currentPage = 1;
//     currentSearchQuery = event.target.searchQuery.value;

//     try {
//       const response = await axios.get('https://pixabay.com/api/', {
//         params: {
//           key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
//           q: currentSearchQuery,
//           per_page: 40,
//           page: currentPage,
//         },
//       });

//       const images = response.data.hits;
//       displayResults(images);
//       showLoadMoreButton();
//     } catch (error) {
//       console.error('Error during search:', error);
//       galleryContainer.innerHTML =
//         '<p>Error during search. Please try again later.</p>';
//       hideLoadMoreButton();
//     }
//   });

//   loadMoreButton.addEventListener('click', async () => {
//     currentPage += 1;

//     try {
//       const response = await axios.get('https://pixabay.com/api/', {
//         params: {
//           key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
//           q: currentSearchQuery,
//           per_page: 40,
//           page: currentPage,
//         },
//       });

//       const newImages = response.data.hits;
//       appendResults(newImages);
//     } catch (error) {
//       console.error('Error loading more images:', error);
//       hideLoadMoreButton();
//     }
//   });

//   function displayResults(images) {
//     galleryContainer.innerHTML = '';

//     if (images.length === 0) {
//       galleryContainer.innerHTML = '<p>No results found.</p>';
//       hideLoadMoreButton();
//       return;
//     }

//     images.forEach(image => {
//       const imageElement = createImageElement(image);
//       galleryContainer.appendChild(imageElement);
//     });
//   }

//   function appendResults(newImages) {
//     if (newImages.length === 0) {
//       hideLoadMoreButton();
//       return;
//     }

//     newImages.forEach(image => {
//       const imageElement = createImageElement(image);
//       galleryContainer.appendChild(imageElement);
//     });
//   }

//   function createImageElement(image) {
//     const photoCard = document.createElement('div');
//     photoCard.classList.add('photo-card');

//     const imageElement = document.createElement('img');
//     imageElement.src = image.previewURL;
//     imageElement.alt = image.tags;
//     imageElement.loading = 'lazy';

//     const infoContainer = document.createElement('div');
//     infoContainer.classList.add('info');

//     const likes = document.createElement('p');
//     likes.classList.add('info-item');
//     likes.innerHTML = `<b>Likes:</b> ${image.likes || 0}`;

//     const views = document.createElement('p');
//     views.classList.add('info-item');
//     views.innerHTML = `<b>Views:</b> ${image.views || 0}`;

//     const comments = document.createElement('p');
//     comments.classList.add('info-item');
//     comments.innerHTML = `<b>Comments:</b> ${image.comments || 0}`;

//     const downloads = document.createElement('p');
//     downloads.classList.add('info-item');
//     downloads.innerHTML = `<b>Downloads:</b> ${image.downloads || 0}`;

//     infoContainer.appendChild(likes);
//     infoContainer.appendChild(views);
//     infoContainer.appendChild(comments);
//     infoContainer.appendChild(downloads);

//     photoCard.appendChild(imageElement);
//     photoCard.appendChild(infoContainer);

//     return photoCard;
//   }

//   function showLoadMoreButton() {
//     loadMoreButton.style.display = 'block';
//   }

//   function hideLoadMoreButton() {
//     loadMoreButton.style.display = 'none';
//   }
// });
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const galleryContainer = document.getElementById('gallery');
  const loadMoreButton = document.querySelector('.load-more');
  let currentPage = 1;
  let currentSearchQuery = '';

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    currentPage = 1;
    currentSearchQuery = event.target.searchQuery.value;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
          q: currentSearchQuery,
          per_page: 40,
          page: currentPage,
        },
      });

      const images = response.data.hits;
      displayResults(images);
      showLoadMoreButton();
    } catch (error) {
      console.error('Error during search:', error);
      showAlert('Error during search. Please try again later.');
      hideLoadMoreButton();
    }
  });

  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
          q: currentSearchQuery,
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
  });

  function displayResults(images) {
    galleryContainer.innerHTML = '';

    if (images.length === 0) {
      showAlert('Error during search. Please try again later.');
      hideLoadMoreButton();
      return;
    }

    images.forEach(image => {
      const imageElement = createImageElement(image);
      galleryContainer.appendChild(imageElement);
    });
  }

  function appendResults(newImages) {
    if (newImages.length === 0) {
      hideLoadMoreButton();
      showAlert("We're sorry, but you've reached the end of search results.");
      return;
    }

    newImages.forEach(image => {
      const imageElement = createImageElement(image);
      galleryContainer.appendChild(imageElement);
    });
  }

  function createImageElement(image) {
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
  }

  function showLoadMoreButton() {
    loadMoreButton.style.display = 'block';
  }

  function hideLoadMoreButton() {
    loadMoreButton.style.display = 'none';
  }

  function showAlert(message) {
    alert(message);
  }
});

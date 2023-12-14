// import axios from 'axios';

// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const resultsContainer = document.getElementById('results');

//   searchForm.addEventListener('submit', async event => {
//     event.preventDefault();

//     const searchQuery = event.target.searchQuery.value;

//     try {
//       const response = await axios.get('https://pixabay.com/api/', {
//         params: {
//           key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
//           q: searchQuery,
//           per_page: 10,
//         },
//       });

//       const images = response.data.hits;
//       displayResults(images);
//     } catch (error) {
//       console.error('Error during search:', error);
//       resultsContainer.innerHTML =
//         '<p>Error during search. Please try again later.</p>';
//     }
//   });

//   function displayResults(images) {
//     resultsContainer.innerHTML = '';

//     if (images.length === 0) {
//       resultsContainer.innerHTML = '<p>No results found.</p>';
//       return;
//     }

//     images.forEach(image => {
//       const imageElement = document.createElement('img');
//       imageElement.src = image.previewURL;
//       resultsContainer.appendChild(imageElement);
//     });
//   }
// });
// import axios from 'axios';

// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const resultsContainer = document.getElementById('results');

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
//           per_page: 10,
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
//     resultsContainer.innerHTML = '';

//     if (images.length === 0) {
//       alert('Error during search. Please try again later...');
//       return;
//     }

//     images.forEach(image => {
//       const imageElement = document.createElement('img');
//       imageElement.src = image.webformatURL;
//       resultsContainer.appendChild(imageElement);
//     });
//   }
// });
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const galleryContainer = document.getElementById('gallery');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const searchQuery = event.target.searchQuery.value;

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '41258332-bc5b81f30b9173b6d7f6fa8ea',
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
        },
      });

      const images = response.data.hits;
      displayResults(images);
    } catch (error) {
      console.error('Error during search:', error);
      alert('Error during search. Please try again later.');
    }
  });

  function displayResults(images) {
    galleryContainer.innerHTML = '';

    if (images.length === 0) {
      alert('No results found.');
      return;
    }

    images.forEach(image => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');

      const imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      imgElement.alt = image.tags;
      imgElement.loading = 'lazy';

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info');

      const likesInfo = createInfoItem('Likes', image.likes);
      const viewsInfo = createInfoItem('Views', image.views);
      const commentsInfo = createInfoItem('Comments', image.comments);
      const downloadsInfo = createInfoItem('Downloads', image.downloads);

      infoContainer.appendChild(likesInfo);
      infoContainer.appendChild(viewsInfo);
      infoContainer.appendChild(commentsInfo);
      infoContainer.appendChild(downloadsInfo);

      photoCard.appendChild(imgElement);
      photoCard.appendChild(infoContainer);

      galleryContainer.appendChild(photoCard);
    });
  }

  function createInfoItem(label, value) {
    const infoItem = document.createElement('p');
    infoItem.classList.add('info-item');
    infoItem.innerHTML = `<b>${label}:</b> ${value}`;
    return infoItem;
  }
});

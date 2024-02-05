const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'jgCJqCreS_boKO9lqSj975rz0nDXdAaDTxNL7kwrjoI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// Helper Function - Don't Repeat Yourself
function setAttributes(element, attirbutes) {
  for (const key in attirbutes) {
    element.setAttribute(key, attirbutes[key]);
  }
}

// Creating an element for links, photos which will be added to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  // Run a function using for each in photosArray
  photosArray.forEach((photo) => {
    // Creating <a> element to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.alt_description,
      alt: photo.alt_description,
    });
    // Event Listener, to check when each are finished loading
    img.addEventListener('load', imageLoaded);
    // Nest <img> inside <a>, then nest both into imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from API using Try Catch Statement

async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Log errors here
  }
}

// Checking to see if Scroll Event is working to load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhoto();
  }
});

//On load
getPhoto();

import axios from 'axios';
import { getImage } from './js/pixabay-API';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('form');
const loadMoreBtnEl = document.querySelector('.load-more');
// let data = getImage();
let gallery = new SimpleLightbox('.gallery a');
let page = 0;
let totalElements = 0;
let showElements = 0;
formEl.addEventListener('submit', getPhoto);

function getPhoto(e) {
  galleryEl.innerHTML = '';
  page = 1;
  e.preventDefault();
  let data = getImage(formEl[0].value, page);
  data.then(res => {
    totalElements = res.data.totalHits;

    if (totalElements === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else showElements += res.data.hits.length;
    Notiflix.Notify.info(`"Hooray! We found ${totalElements} images."`);
    let hits = res.data.hits;
    let newMurkup = '';
    hits.forEach(photo => {
      let {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = photo;
      newMurkup += `
      
      <div class="photo-card">     
      <a href="${largeImageURL}"> 
      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
       </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
 
</div>`;
    });
    galleryEl.insertAdjacentHTML('beforeend', newMurkup);
    gallery.refresh();
    loadMoreBtnEl.classList.remove('hidden');
  });
}

loadMoreBtnEl.addEventListener('click', loadMore);

function loadMore() {
  loadMoreBtnEl.classList.add('hidden');
  page += 1;

  let data = getImage(formEl[0].value, page);
  data.then(res => {
    showElements += res.data.hits.length;
    let hits = res.data.hits;
    let newMurkup = '';
    hits.forEach(photo => {
      let {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = photo;
      newMurkup += `
      
      <div class="photo-card">     
      <a href="${largeImageURL}"> 
      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  
</div>`;
    });
    galleryEl.insertAdjacentHTML('beforeend', newMurkup);
    gallery.refresh();
    if (totalElements > showElements) {
      loadMoreBtnEl.classList.remove('hidden');
    } else {
      loadMoreBtnEl.classList.add('hidden');
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
}

import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PIXABAY_API } from './js/pixabay-API';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('form');
const loadMoreBtnEl = document.querySelector('.load-more');
// let data = getImage();
let gallery = new SimpleLightbox('.gallery a');

let newFetch = new PIXABAY_API();

let request;
let pageNum = 1;
let totalHits = 0;
let IsGet = 0;

function getPhoto(e) {
  e.preventDefault();

  galleryEl.innerHTML = '';
  request = formEl[0].value;
  newFetch.getImage(`${request}`).then(data => {
    if (data.data.totalHits === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    loadMoreBtnEl.classList.remove('hidden');

    let dat = data.data.hits;
    totalHits = data.data.totalHits;
    IsGet = dat.length;
    pageNum = 1;
    console.log(IsGet);
    Notiflix.Notify.info(`"Hooray! We found ${totalHits} images."`);

    getMurkup(dat);
  });
}

function loadMore() {
  if (totalHits > IsGet) {
    pageNum += 1;
    newFetch.getImage(`${request}`, pageNum).then(data => {
      let dat = data.data.hits;
      getMurkup(dat);
      IsGet += dat.length;
      console.log(IsGet);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if (totalHits === IsGet) {
        loadMoreBtnEl.classList.add('hidden');
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
    });
  }
}

function getMurkup(dataArr) {
  let newMurkup = '';
  dataArr.forEach(photo => {
    const {
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
}

formEl.addEventListener('submit', getPhoto);
loadMoreBtnEl.addEventListener('click', loadMore);

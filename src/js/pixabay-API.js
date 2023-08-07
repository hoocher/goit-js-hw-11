import axios from 'axios';

const formEl = document.querySelector('.search-form');

export async function getImage(tag, pag) {
  let find = `${tag}`;
  let page = `${pag}`;
  let per_page = 40;
  const API_KEY = '38646784-30fa50ee56e34cceca0d99061';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${find}&per_page=${per_page}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`;

  return await axios.get(`${URL}`);
}

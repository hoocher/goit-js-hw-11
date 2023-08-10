import axios from 'axios';

export class PIXABAY_API {
  per_page = 40;
  API_KEY = '38646784-30fa50ee56e34cceca0d99061';

  async getImage(tag, pag) {
    let url = `https://pixabay.com/api/?key=${this.API_KEY}&q=${tag}&per_page=${
      this.per_page
    }&page=${pag || 1}&image_type=photo&orientation=horizontal&safesearch=true`;

    return await axios.get(url);
  }
}

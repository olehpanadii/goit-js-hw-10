import axios from 'axios';
import Notiflix from 'notiflix';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(
        Notiflix.Notify.failure(`${elements.onError.textContent}`)
      );
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error(
        Notiflix.Notify.failure(`${elements.onError.textContent}`)
      );
    });
}

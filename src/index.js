import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  onError: document.querySelector('.error'),
  infoContainer: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] =
  'live_4HFK4IlwRBiXmvC6mHPgQ4yAmRdoWRkUmdW5PAEMgVQIrmE1YKLrVz0yhTwB23gc';

fetchBreeds()
  .then(breeds => {
    const breedOpions = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');

    elements.select.insertAdjacentHTML('beforeend', breedOpions);
  })
  .catch(error => {
    throw new Error(Notiflix.Notify.failure(elements.onError.textContent));
  });

elements.select.addEventListener('change', handlerOnChange);

function handlerOnChange() {
  const value = elements.select.value;
  fetchCatByBreed(value)
    .then(cat => {
      elements.infoContainer.innerHTML = `<img class="cat-img" src="${cat.url}" alt="${cat.breeds[0].name}" width="400" height="300">
<h2 class="breed=name">${cat.breeds[0].name}</h2>
<p class="description">Description:${cat.breeds[0].description}</p>
<p class="breed-temp">Temperament:${cat.breeds[0].temperament}</p>`;
    })
    .catch(error => {
      throw new Error(Notiflix.Notify.failure(elements.onError.textContent));
    });
}

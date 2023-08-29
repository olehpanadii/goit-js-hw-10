import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.js-loader'),
  onError: document.querySelector('.error'),
  infoContainer: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] =
  'live_4HFK4IlwRBiXmvC6mHPgQ4yAmRdoWRkUmdW5PAEMgVQIrmE1YKLrVz0yhTwB23gc';
elements.select.style.display = 'none';
fetchBreeds()
  .then(breeds => {
    const breedOpions = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');

    elements.select.insertAdjacentHTML('beforeend', breedOpions);
  })
  .catch(error => {
    throw new Error(Notiflix.Notify.failure(elements.onError.textContent));
  })
  .finally(() => {
    elements.loader.classList.remove('loader'),
      (elements.select.style.display = 'block');
  });

elements.select.addEventListener('change', handlerOnChange);

elements.loader.classList.add('loader');

function handlerOnChange(evt) {
  const value = elements.select.value;
  elements.loader.classList.add('loader');
  fetchCatByBreed(value)
    .then(cat => {
      elements.infoContainer.innerHTML = `<img class="cat-img" src="${cat.url}" alt="${cat.breeds[0].name}" width="400" height="300">
<h2 class="breed=name">${cat.breeds[0].name}</h2>
<p class="description"><span class="text-decotarion">Description:</span> ${cat.breeds[0].description}</p>
<p class="breed-temp"><span class="text-decotarion">Temperament:</span> ${cat.breeds[0].temperament}</p>`;
    })
    .catch(error => {
      elements.infoContainer.innerHTML = '';
      throw new Error(Notiflix.Notify.failure(elements.onError.textContent));
    })
    .finally(() => {
      elements.loader.classList.remove('loader');
    });
}

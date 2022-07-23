import { renderMovieCards } from './render-movie-cards';
import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_URL } from './api/api-vars';
// import { onFormSubmit } from './search';

const refs = {
  btnToday: document.querySelector('button[data-group="today"]'),
  filterBg: document.querySelector('.background__filter'),
  btnWeek: document.querySelector('button[data-group="week"]'),
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.header__form'),
  filter: document.querySelector('.filter'),
  toTrendingBtn: document.querySelector('.to-trending__button'),
};

export const {
  btnToday,
  filterBg,
  btnWeek,
  gallery,
  form,
  filter,
  toTrendingBtn,
} = refs;
let anchorNodeToday = btnToday.parentNode.parentNode;
let anchorNodeWeek = btnWeek.parentNode.parentNode;

let page = 1;

toTrendingBtn.addEventListener('click', toTrendingBtnClick);

btnToday.addEventListener('click', () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_DAY = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  if (anchorNodeToday.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.add('selected');
    anchorNodeWeek.classList.remove('selected');
    filterBg.classList.remove('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_DAY);
    renderMovies(TREND_URL_DAY + `&page=${page}`);
  }
});

btnWeek.addEventListener('click', () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_WEEK = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_WEEK);
    renderMovies(TREND_URL_WEEK + `&page=${page}`);
  }
});

function renderMovies(url) {
  getMovies(url).then(response => {
    renderMovieCards(response.results);
  });
}

function toTrendingBtnClick() {
  page = document.querySelector('.pagination-button--current').dataset.page;

  const TREND_URL_WEEK = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

  filter.classList.remove('is-hidden');
  toTrendingBtn.classList.add('is-hidden');

  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_WEEK);
    renderMovies(TREND_URL_WEEK + `&page=${page}`);
  }
}
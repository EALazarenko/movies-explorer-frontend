import { DURATION_SHORT_MOVIE } from "./constant";

export const convertMinToHours = (num) => {
  const minutes = num % 60;
  const hours = (num - minutes) / 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

export function filterMovies ({
  movies,
  searchText = '',
  filterShortMovies
}) {
  let filteredFilms = movies.filter((item) => {
    if (filterShortMovies) {
      return item.duration <= DURATION_SHORT_MOVIE;
    } else {
      return true;
    }
  });
  filteredFilms = filteredFilms.filter((item) =>
    item.nameRU
      ? item.nameRU.toLowerCase().includes(searchText.toLowerCase())
      : false
  );
  return filteredFilms;
}

/* export function filterShortMovies(movies) {
  return movies.filter(duration => duration < 40);
} */

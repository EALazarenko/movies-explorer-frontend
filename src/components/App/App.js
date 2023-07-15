import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import {
  authorize,
  checkToken,
  register,
  editUserInfo
} from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getMovies } from '../../utils/MoviesApi';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  DURATION_SHORT_MOVIE,
  BIG_SCREEN_MOVIES,
  MIDDLE_SCREEN_MOVIES,
  SMALL_SCREEN_MOVIES,
  MORE_MOVIES_BIG_SCREEN,
  MORE_MOVIES_SMALL_SCREEN,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constant';

function App() {
  const location = useLocation();
  const showHeaderBloc = ['/', '/movies', '/saved-movies', '/profile'];
  const showHeader = showHeaderBloc.includes(location.pathname);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    values,
    setValues,
    setIsValid,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormValidation();


  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');
  const [searchValueShort, setSearchValueShort] = useState({});
  const [isToggle, setIsToggle] = useLocalStorage('isToggle', false);
  const [filteredShortMovies, setFilteredShortMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useLocalStorage('filteredMovies', []);

  const getAllMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
      localStorage.setItem('allMovies', JSON.stringify(data));
      localStorage.setItem('filteredMovies', JSON.stringify(data)); // сохранение filteredMovies в локальное хранилище
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  const searchMovies = async (searchQuery) => {
    try {
      setSearchValue(searchQuery);
      const data = await getMovies(searchQuery);
      setMovies(data);
      setSearchValueShort(setIsToggle);

      // Фильтрация фильмов по короткометражкам
      const filteredData = data.filter((movie) => movie.duration <= 40);
      setFilteredMovies(filteredData);

      localStorage.setItem('searchResults', JSON.stringify(data));
      localStorage.setItem('filteredMovies', JSON.stringify(filteredData)); // сохранение отфильтрованных фильмов в локальное хранилище
    } catch (error) {
      console.log(error);
    }
};

useEffect(() => {
  const storedFilteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
  if (storedFilteredMovies) {
    setFilteredMovies(storedFilteredMovies);
  }
}, []);

useEffect(() => {
  if (searchValue) {
    localStorage.setItem('lastSearchQuery', searchValue);
  }
}, [searchValue]);

useEffect(() => {
  const storedLastSearchQuery = localStorage.getItem('lastSearchQuery');
  if (storedLastSearchQuery) {
    setSearchValue(storedLastSearchQuery);
  }
}, []);
  /* const handleShortMoviesChange = (value) => {
    setIsShortMovies(value);
  };

  const filteredShortMovies = isShortMovies ? movies.filter(movie => movie.duration <= DURATION_SHORT_MOVIE) : movies; */

  /* const [searchResults, setSearchResults] = useState([]); */

  /* useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      setSearchResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults]); */

  const cbAuthenticate = useCallback(data => {
    if (!data) {
      throw new Error('Ошибка аутентификации');
    }
    if (data) {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      navigate('/movies', { replace: true });
    }
  }, []);

  const cbLogin = useCallback(async ({ email, password }) => {
    try {
      const data = await
        authorize(email, password);
      cbAuthenticate(data);
    }
    catch (err) {
      console.log(`Ошибка: ${err}`);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  function cbRegister(name, email, password) {
    setIsLoading(true)
    register(name, email, password)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        navigate('/signin', { replace: true }); // куда отправлять?? в пачке про это было?
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  const cbLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }

  /*  useEffect(() => {
     if (loggedIn) {
       Promise.all([api.getUserInfo(), api.getInitialCards()])
         .then(([{ name, about, avatar, _id }, cards]) => {
           setCurrentUser({ name, about, avatar, _id });
           setCards(cards);
         })
         .catch((error) => {
           console.error(error);
         })
         .finally(() => setLoading(false));
     }
   }, [loggedIn]); */

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      setIsLoading(true)
      checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          navigate('/', { replace: true });

        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn]);

  // edit profile
  function handleUpdateUser({ name, email }) {
    editUserInfo(name, email)
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }



  if (isLoading) return <Preloader />;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {showHeader && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login isLoggedId={loggedIn} onLogin={cbLogin} />}></Route>
          <Route path="/signup" element={<Register isLoggedId={loggedIn} onRegister={cbRegister} />}></Route>
          {/* <Route path="/signout" element={<SignOut />} /> */}
          <Route path="/movies"
            element={<Movies
              filteredMovies={filteredMovies}
              isLoggedId={loggedIn}
              movies={movies}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchValueShort={searchValueShort}
        onSearch={searchMovies}
        isToggle={isToggle}
         />} />
          <Route path="/saved-movies" element={<SavedMovies isLoggedId={loggedIn} />} />
          <Route path="/profile" element={<Profile isLoggedId={loggedIn} onLogout={cbLogout} onUpdateUser={handleUpdateUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

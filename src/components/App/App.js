import React, { useEffect, useState, useCallback } from 'react';
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
  editUserInfo,
  createMovie,
  getDeleteMovie,
  getSavedMovie,
  getUserInfo
} from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getMovies } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();
  const showHeaderBloc = ['/', '/movies', '/saved-movies', '/profile'];
  const showHeader = showHeaderBloc.includes(location.pathname);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isToggle, setIsToggle] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const currentUrl = location.pathname;


  const searchMovies = useCallback(async (searchValue) => {

    try {
      setSearchValue(searchValue);
      const data = await getMovies(searchValue);
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSaveMovie = async (movie) => {
    const jwt = localStorage.getItem('jwt');
    try {
      const savedMovie = await createMovie(movie, jwt);
      setSavedMovies([...savedMovies, savedMovie]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    const jwt = localStorage.getItem('jwt');
    try {
      await getDeleteMovie(movieId, jwt);
      setSavedMovies(savedMovies.filter(movie => movie._id !== movieId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegistration = async (name, email, password) => {
    return register(name, email, password)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([getMovies(), getSavedMovie()])
        .then(([moviesData, savedMoviesData]) => {
          setMovies(moviesData);
          setSavedMovies(savedMoviesData);
          localStorage.setItem('moviesData', JSON.stringify(moviesData));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  const handleAuthorization = async (email, password) => {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cbLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem('token');
    setSavedMovies([]);
    navigate('/', { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      setIsLoading(true)
      checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(currentUrl, { replace: true });

        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [currentUrl, loggedIn, navigate, setCurrentUser]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [loggedIn, setCurrentUser]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [loggedIn]);

  function handleUpdateUser(name, email) {
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
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/signin" element={<Login loggedIn={loggedIn} onLogin={handleAuthorization} />}></Route>
          <Route path="/signup" element={<Register loggedIn={loggedIn} onRegister={handleRegistration} />}></Route>
          <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
              movies={movies}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={searchMovies}
              isToggle={isToggle}
              setIsToggle={setIsToggle}
              onDelete={handleDeleteMovie}
              onSave={handleSaveMovie}
              savedMovies={savedMovies}
              isLoading={isLoading}
            />} />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
              onDelete={handleDeleteMovie}
              movies={savedMovies}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={searchMovies}
              isToggle={isToggle}
              setIsToggle={setIsToggle}
            />} />
          <Route path="/profile" element={
            <ProtectedRoute element={Profile} loggedIn={loggedIn} onLogout={cbLogout} onUpdateUser={handleUpdateUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const location = useLocation();
  const showHeaderBloc = ['/', '/movies', '/saved-movies', '/profile'];
  const showHeader = showHeaderBloc.includes(location.pathname);

  return (
    <div className="page">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        {/* <Route path="/signout" element={<SignOut />} /> */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

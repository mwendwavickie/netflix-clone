import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WatchListPage from './pages/WatchlistPage';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <Router>
      <Navbar />
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/watchlist" 
        element={
        <PrivateRoute>
          <WatchListPage />
        </PrivateRoute>
        }
      />
     </Routes>
   </Router>
  );
}
export default App;
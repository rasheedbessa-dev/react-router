import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import Filtre from "./components/Filtre";
import MovieDetail from "./pages/MovieDetail";
import "./app.css";

function App() {
  const [moviesListData, setMoviesListData] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: "Drama",
      rating: 9.3,
      isOpen: true,
      src: "https://imgs.search.brave.com/p7Lv-nZH_IP3LDSG5V_vi0r4Ca2tIu0EC_MFDuhRv_U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC8zL2Mv/NC8xNzE5NzMtMTky/MHgxMDgwLWRlc2t0/b3AtZnVsbC1oZC10/aGUtc2hhd3NoYW5r/LXJlZGVtcHRpb24t/YmFja2dyb3VuZC5q/cGc",
      trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
    },
    {
      id: 2,
      title: "The Godfather",
      isOpen: false,
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Crime",
      rating: 9.2,
      src: "https://4kwallpapers.com/images/wallpapers/the-godfather-movie-2048x2048-13940.jpg",
      trailer: "https://www.youtube.com/embed/sY1S34973zA",
    },
    {
      id: 3,
      title: "The Dark Knight",
      isOpen: true,
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: "Action",
      rating: 9.0,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMtkGBfHb06Qfe-eI5WYVbzMZ18yHhdowsA&s",
      trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      isOpen: true,
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      genre: "Crime",
      rating: 8.9,
      src: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/5864738/5864738-1693433608279-72a076a1d47.jpg",
      trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    },
  ]);

  const [totalLikes, setTotalLikes] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState(moviesListData);

  const handleFilterChange = (newFilteredMovies) => {
    setFilteredMovies(newFilteredMovies);
  };

  const handleAddMovie = (newMovie) => {
    const movieToAdd = {
      ...newMovie,
      id: moviesListData.length + 1,
      likes: 0,
      isOpen: true,
    };

    const updatedMovies = [...moviesListData, movieToAdd];
    setMoviesListData(updatedMovies);
    setFilteredMovies(updatedMovies);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <Routes>
          {/* Page d'accueil */}
          <Route
            path="/"
            element={
              <>
                <Filtre
                  moviesListData={moviesListData}
                  onFilterChange={handleFilterChange}
                  onAddMovie={handleAddMovie}
                />
                <MoviesList
                  moviesListData={filteredMovies}
                  totalLikes={totalLikes}
                  setTotalLikes={setTotalLikes}
                />
              </>
            }
          />

          {/* Page de détail du film */}
          <Route
            path="/movie/:id"
            element={
              <MovieDetail
                moviesListData={moviesListData}
                totalLikes={totalLikes}
                setTotalLikes={setTotalLikes}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
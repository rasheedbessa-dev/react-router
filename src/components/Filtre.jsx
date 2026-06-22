import { useState } from "react";
import "./Filtre.css";

function Filtre({ moviesListData, onFilterChange, onAddMovie }) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    src: "",           // ← Changé : posterURL → src (comme ton MovieCard)
    rating: 5,
    genre: "",         // ← Ajouté
    trailer: "",       // ← NOUVEAU : lien YouTube embed
  });

  const handleIsFilteredChange = () => {
    const newValue = !isFiltered;
    setIsFiltered(newValue);
    applyFilters(newValue, search, minRating);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    applyFilters(isFiltered, value, minRating);
  };

  const handleMinRatingChange = (event) => {
    const value = parseFloat(event.target.value);
    setMinRating(value);
    applyFilters(isFiltered, search, value);
  };

  const applyFilters = (filtered, searchValue, ratingValue) => {
    let result = moviesListData;

    if (filtered) {
      result = result.filter((movie) => movie.isOpen);
    }

    if (searchValue) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    }

    if (ratingValue > 0) {
      result = result.filter((movie) => movie.rating >= ratingValue);
    }

    onFilterChange(result);
  };

  const handleNewMovieChange = (event) => {
    const { name, value } = event.target;
    setNewMovie({
      ...newMovie,
      [name]: name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMovie.title && newMovie.src) {
      onAddMovie(newMovie);
      setNewMovie({
        title: "",
        description: "",
        src: "",
        rating: 5,
        genre: "",
        trailer: "",     // ← Réinitialisé
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="filtre-container">
      <h3 className="filtre-title">🔍 Filtrer les films</h3>

      <div className="filtre-controls">
        <button
          className={`filter-toggle ${isFiltered ? "active" : ""}`}
          onClick={handleIsFilteredChange}
        >
          {isFiltered ? "Filtre ON 🟢" : "Filtre OFF 🔴"}
        </button>

        <div className="search-box">
          <label>Search:</label>
          <input
            type="text"
            value={search}
            placeholder="Rechercher un titre..."
            onChange={handleSearchChange}
          />
        </div>

        <div className="rating-filter">
          <label>Note min: {minRating}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={minRating}
            onChange={handleMinRatingChange}
          />
        </div>
      </div>

      <button
        className="show-add-form-button"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "❌ Annuler" : "➕ Ajouter un film"}
      </button>

      {showAddForm && (
        <form className="add-movie-form" onSubmit={handleSubmit}>
          <h4>Nouveau Film</h4>
          
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={newMovie.title}
            onChange={handleNewMovieChange}
            required
          />
          
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newMovie.description}
            onChange={handleNewMovieChange}
          />
          
          <input
            type="url"
            name="src"                    // ← Changé : posterURL → src
            placeholder="URL de l'affiche"
            value={newMovie.src}
            onChange={handleNewMovieChange}
            required
          />
          
          <input
            type="text"
            name="genre"
            placeholder="Genre (ex: Action, Drama...)"
            value={newMovie.genre}
            onChange={handleNewMovieChange}
          />
          
          {/* ← NOUVEAU : champ trailer */}
          <input
            type="url"
            name="trailer"
            placeholder="Lien YouTube embed (ex: https://www.youtube.com/embed/...)"
            value={newMovie.trailer}
            onChange={handleNewMovieChange}
          />
          
          <div className="rating-input">
            <label>Note: {newMovie.rating}/10</label>
            <input
              type="range"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={newMovie.rating}
              onChange={handleNewMovieChange}
            />
          </div>
          
          <button type="submit" className="submit-button">
            ✅ Ajouter
          </button>
        </form>
      )}
    </div>
  );
}

export default Filtre;
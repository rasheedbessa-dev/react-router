import { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard(props) {
  const { id, isOpen, rating, src, title, description, genre } = props.movieData;
  const [liked, setLiked] = useState(false);

  function handleLikedMovies() {
    setLiked(!liked);
    if (!liked) {
      props.setTotalLikes(props.totalLikes + 1);
    } else {
      props.setTotalLikes(props.totalLikes - 1);
    }
  }

  return (
    <div className="movie-card-container">
      {/* Lien vers la page de détail - enveloppe l'image et le titre */}
      <Link to={`/movie/${id}`} className="movie-link">
        <div className="poster-container">
          {isOpen ? (
            <p className="movie-badge" style={{ backgroundColor: "green" }}>
              Showing
            </p>
          ) : (
            <p className="movie-badge" style={{ backgroundColor: "red" }}>
              Comming Soon
            </p>
          )}
          {(rating > 9.1 && <p className="top-badge">Top</p>) || (
            <p className="top-badge">Avg</p>
          )}
          <img className="movie-poster" src={src} alt={title} />
        </div>
        
        <div className="movie-information">
          <h4 className="movie-title">{title}</h4>
          <p className="movie-description">{description}</p>
          <p className="movie-rating">Rating: {rating}/10</p>
          <p className="movie-genre">{genre}</p>
        </div>
      </Link>

      {/* Bouton Like reste en dehors du lien */}
      <button onClick={handleLikedMovies}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default MovieCard;
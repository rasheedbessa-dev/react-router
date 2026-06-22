import { useParams, Link } from "react-router-dom";

function MovieDetail({ moviesListData }) {
  // Récupère l'id depuis l'URL (/movie/1 → id = "1")
  const { id } = useParams();

  // Trouve le film correspondant
  const movie = moviesListData.find((m) => m.id === parseInt(id));

  // Si le film n'existe pas
  if (!movie) {
    return (
      <div className="not-found">
        <h2>❌ Film non trouvé</h2>
        <Link to="/" className="back-button">← Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      {/* Bouton retour */}
      <Link to="/" className="back-button">← Retour à l'accueil</Link>

      <div className="detail-content">
        {/* Image du film */}
        <img src={movie.src} alt={movie.title} className="detail-poster" />

        {/* Informations */}
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p className="detail-genre">{movie.genre} | ⭐ {movie.rating}</p>
          <p className="detail-description">{movie.description}</p>

          {/* Bande-annonce */}
          {movie.trailer && (
            <div className="trailer-section">
              <h3>🎬 Bande-annonce</h3>
              <iframe
                width="560"
                height="315"
                src={movie.trailer}
                title="Bande-annonce"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
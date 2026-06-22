import MovieCard from "./MovieCard";

function MoviesList({ moviesListData = [], totalLikes, setTotalLikes }) {
  // ↑↑↑ AJOUTE = [] comme valeur par défaut

  // Vérifie si moviesListData existe avant de faire .map()
  if (!moviesListData) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1 className="text-red title">Most Rated Movies</h1>
      <h4 className="total-likes">Total Likes is : {totalLikes}</h4>

      <div className="movies-grid">
        {moviesListData.map((movie, idx) => (
          <MovieCard
            setTotalLikes={setTotalLikes}
            totalLikes={totalLikes}
            movieData={movie}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
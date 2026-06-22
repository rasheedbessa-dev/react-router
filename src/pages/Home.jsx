import MoviesList from "../components/MoviesList";
import Filtre from "../components/Filtre";

function Home({ moviesListData, filteredMovies, onFilterChange, onAddMovie }) {
  return (
    <div>
      <MoviesList moviesListData={filteredMovies} />
      <Filtre
        moviesListData={moviesListData}
        onFilterChange={onFilterChange}
        onAddMovie={onAddMovie}
      />
    </div>
  );
}

export default Home;
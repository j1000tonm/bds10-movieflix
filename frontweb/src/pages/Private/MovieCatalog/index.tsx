import { AxiosRequestConfig } from 'axios';
import MovieCatalogCard from 'components/MovieCatalogCard';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
}

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
    {
      activePage: 0
    }
  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({activePage: pageNumber});
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: controlComponentsData.activePage,
        size: 4,
      },
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData])

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-4 catalog-container">
      <div className="base-card movie-filter-container text-white">
        Search bar
      </div>
      <div className="row">
        {page?.content.map((movie) => (
          <div key={movie.id} className="col-sm-6 col-xl-3">
            <Link to={`/movies/${movie.id}`}>
              <MovieCatalogCard movies={movie} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination 
        pageCount={page ? page?.totalPages : 0} 
        range={3} 
        onChange={handlePageChange} 
      />
    </div>
  );
};

export default MovieCatalog;

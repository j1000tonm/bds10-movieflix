import { AxiosRequestConfig } from 'axios';
import ReviewCard from 'components/ReviewCard';
import { useEffect, useState } from 'react';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: 0,
        size: 4,
      },
      withCredentials: true,
     };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="base-card movie-filter-container text-white">Search bar</div>
      <div className="row">
        {page?.content.map(movie => (
          <div key={movie.id} className="col-sm-6 col-xl-3">
            <ReviewCard movies={movie}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;

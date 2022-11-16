import { AxiosRequestConfig } from 'axios';
import ReviewCard from 'components/ReviewCard';
import { useEffect, useState } from 'react';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {

  const movie : Movie = {
    "id": 1,
    "title": "Bob Esponja",
    "subTitle": "O Incrível Resgate",
    "year": 2020,
    "imgUrl": "https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg",
    "synopsis": "Onde está Gary? Segundo Bob Esponja, Gary foi \"caracolstrado\" pelo temível Rei Poseidon e levado para a cidade perdida de Atlantic City. Junto a Patrick Estrela, ele sai em uma missão de resgate ao querido amigo, e nesta jornada os dois vão conhecer novos personagens e viver inimagináveis aventuras.",
    "genre": {
        "id": 1,
        "name": "Comédia"
    }
}

  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="text-white">Search bar</div>
      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <ReviewCard movies={movie}/>
        </div>
        <div className="col-sm-6 col-xl-3">
          <ReviewCard movies={movie}/>
        </div>
        <div className="col-sm-6 col-xl-3">
          <ReviewCard movies={movie}/>
        </div>
        <div className="col-sm-6 col-xl-3">
          <ReviewCard movies={movie}/>
        </div>
        <div className="col-sm-6 col-xl-3">
          <ReviewCard movies={movie}/>
        </div>
      </div>
    </div>
  );
};

export default MovieCatalog;

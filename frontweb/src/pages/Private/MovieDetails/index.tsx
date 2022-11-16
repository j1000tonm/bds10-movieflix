import { AxiosRequestConfig } from 'axios';
import ReviewCard from 'components/ReviewCard';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';
import './styles.css';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="movie-details-contanier">
      <div className="base-card movie-details-card">
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg"
                alt="Titulo do filme"
              />
            </div>
            <div className="title-year-subtitle-container">
              <h1>Titulo do filme</h1>
              <h6>2022</h6>
              <p>Subtitulo</p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="movie-synopsis-container">
              <p>
                O confronto final entre as forças do bem e do mal que lutam pelo
                controle do futuro da Terra Média se aproxima. Sauron planeja um
                grande ataque a Minas Tirith, capital de Gondor, o que faz com
                que Gandalf e Pippin partam para o local na intenção de ajudar a
                resistência. Um exército é reunido por Theoden em Rohan, em mais
                uma tentativa de deter as forças de Sauron. Enquanto isso,
                Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da
                Perdição para destruir o anel.
              </p>
            </div>
          </div>
        </div>

        {hasAnyRoles(['ROLE_MEMBER']) && (
          <div className="base-card review-content-contanier">
            <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
          </div>
        )}

        <ReviewListing reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetails;

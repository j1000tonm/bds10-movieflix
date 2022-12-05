import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        toast.info('Avaliação salva com sucesso');
        setValue('text', '');
        onInsertReview(response.data);
      })
      .catch((error) => {
        toast.error('Erro ao salvar avaliação');
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('text', {
                required: 'Campo obrigatório',
              })}
              type="text"
              className="form-control base-input"
              placeholder="Deixe sua avaliação aqui"
              name="text"
            />
            <div>{errors.text?.message}</div>
          </div>
          <div className="save-submit">
            <ButtonIcon text="Salvar avaliação" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

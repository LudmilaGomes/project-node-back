import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

const createAutor = celebrate(
  {
    body: Joi.object().keys({
      nome: Joi.string().required(),
      data_nasc: Joi.date().required(),
      nacionalidade: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const updateAutor = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
    body: Joi.object().keys({
      nome: Joi.string(),
      data_nasc: Joi.date(),
      nacionalidade: Joi.string(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const readAutor = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

const deleteAutor = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

const searchAutor = celebrate(
  {
    params: Joi.object().keys({nome_autor: Joi.string().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

export { createAutor, updateAutor, readAutor, deleteAutor, searchAutor };
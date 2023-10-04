import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

const createLivro = celebrate(
  {
    body: Joi.object().keys({
      nome: Joi.string().required(),
      nome_autor: Joi.string().required(),
      nome_editora: Joi.string().required(),
      descricao: Joi.string().required(),
      quantidade: Joi.number().required(),
      data_public: Joi.string().required(),
      genero: Joi.string().required(),
      volume: Joi.number().required(),
      edicao: Joi.number().required(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const updateLivro = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
    body: Joi.object().keys({
      nome: Joi.string().allow('').optional(),
      nome_autor: Joi.string().allow('').optional(),
      nome_editora: Joi.string().allow('').optional(),
      descricao: Joi.string().allow('').optional(),
      quantidade: Joi.number().allow('').optional(),
      data_public: Joi.date().allow('').optional(),
      genero: Joi.string().allow('').optional(),
      volume: Joi.number().allow('').optional(),
      edicao: Joi.number().allow('').optional(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const deleteLivro = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

const searchLivro = celebrate(
  {
    params: Joi.object().keys({nome_livro: Joi.string().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

export { createLivro, updateLivro, deleteLivro, searchLivro };
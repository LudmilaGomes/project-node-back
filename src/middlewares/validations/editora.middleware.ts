import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

const createEditora = celebrate(
  {
    body: Joi.object().keys({
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      num_telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      site: Joi.string().required(),
      ano_fundacao: Joi.number().required(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const updateEditora = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
    body: Joi.object().keys({
      nome: Joi.string(),
      endereco: Joi.string(),
      num_telefone: Joi.string(),
      email: Joi.string().email(),
      site: Joi.string(),
      ano_fundacao: Joi.number(),
    }),
  },
  {
    abortEarly: false,
    messages,
  }
);

const deleteEditora = celebrate(
  {
    params: Joi.object().keys({id: Joi.number().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

const searchEditora = celebrate(
  {
    params: Joi.object().keys({nome_editora: Joi.string().required()}),
  },
  {
    abortEarly: false,
    messages,
  }
);

export { createEditora, updateEditora, deleteEditora, searchEditora };
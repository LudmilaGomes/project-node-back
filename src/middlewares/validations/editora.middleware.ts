import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

const createEditora = celebrate(
  {
    body: Joi.object().keys({
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      num_telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      site: Joi.string().allow('').optional(),
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
      nome: Joi.string().allow('').optional(),
      endereco: Joi.string().allow('').optional(),
      num_telefone: Joi.string().allow('').optional(),
      email: Joi.string().email().allow('').optional(),
      site: Joi.string().allow('').optional(),
      ano_fundacao: Joi.number().allow('').optional(),
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
import { EntityRepository, Repository } from 'typeorm';
import { Livro } from '../models/Livro';

@EntityRepository(Livro)
export default class LivroRepository extends Repository<Livro> {}
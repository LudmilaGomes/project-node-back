import { EntityRepository, Repository } from 'typeorm';
import { Autor } from '../models/Autor';

@EntityRepository(Autor)
export default class AutorRepository extends Repository<Autor> {}
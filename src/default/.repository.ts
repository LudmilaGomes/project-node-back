import { EntityRepository, Repository } from 'typeorm';
import { Insere } from '../models/Insere';

@EntityRepository(Insere)
export default class InsereRepository extends Repository<Insere> {}
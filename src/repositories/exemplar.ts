import { EntityRepository, Repository } from 'typeorm';
import { Exemplar } from '../models/Exemplar';

@EntityRepository(Exemplar)
export default class ExemplarRepository extends Repository<Exemplar> {}
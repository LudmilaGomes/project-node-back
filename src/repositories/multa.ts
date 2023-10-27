import { EntityRepository, Repository } from 'typeorm';
import { Multa } from '../models/Multa';

@EntityRepository(Multa)
export default class MultaRepository extends Repository<Multa> {}
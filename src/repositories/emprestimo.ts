import { EntityRepository, Repository } from 'typeorm';
import { Emprestimo } from '../models/Emprestimo';

@EntityRepository(Emprestimo)
export default class EmprestimoRepository extends Repository<Emprestimo> {}
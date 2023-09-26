import { EntityRepository, Repository } from 'typeorm';
import { Editora } from '../models/Editora';

@EntityRepository(Editora)
export default class EditoraRepository extends Repository<Editora> {}
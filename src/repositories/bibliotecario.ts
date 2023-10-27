import { EntityRepository, Repository } from 'typeorm';
import { Bibliotecario } from '../models/Bibliotecario';

@EntityRepository(Bibliotecario)
export default class BibliotecarioRepository extends Repository<Bibliotecario> {}
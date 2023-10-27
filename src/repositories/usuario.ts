import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../models/Usuario';

@EntityRepository(Usuario)
export default class UsuarioRepository extends Repository<Usuario> {}
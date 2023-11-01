import { getConnection, getRepository } from 'typeorm';
import UsuarioRepository from '../repositories/usuario';
import { Usuario } from '../models/Usuario';

class UsuarioService 
{
  // Usuario dados para um Usuario no banco de dados
  async create(nome: string, cpf: string, email: string, senha: string, info_estudante: any, data_nasc: Date, genero: string, endereco: string, telefone: string)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    // verifica se é estudante ou não; a partir de resposta do usuário, indica 0 ou 1
    var eh_estudante;
    if (info_estudante == "sim" || info_estudante == "s") 
      eh_estudante = 1;
    else if (info_estudante == "nao" || info_estudante == "n") 
      eh_estudante = 0;
    else
      throw new Error('Entrada \"estudante\" inválida');
    const tem_multa = 0; // ao ser cadastrado, usuário não possui multa
    const Usuario: any = {nome, cpf, email, senha, eh_estudante, data_nasc, genero, endereco, telefone, tem_multa}; // cria objeto com os dados do Usuario
    
    try 
    {
      // verifica se Usuario já está cadastrado no banco de dados
      const verif_aut = await UsuarioRepo.findOne(Usuario);
      if (verif_aut) // se Usuario existir, então envia exceção
        throw new Error('Usuario já cadastrado!');

      const UsuarioDb: any = await UsuarioRepo.save(Usuario); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (UsuarioDb)
        return UsuarioDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async loginUsuario(email: string, senha: string)
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    try 
    {
      // verifica o usuário se existe
      const verifica_usuario: any = await UsuarioRepo.findOne({ email });
      if (!verifica_usuario)
        throw new Error('Operação não pode ser realizada');

      // verifica se usuário existente tem a senha enviada
      if (verifica_usuario.senha != senha)
        throw new Error('Operação não pode ser realizada');

      // retorna id do usuário e a string 'usuario'; informações usadas no programa interativo
      return [verifica_usuario.id, "usuario"];
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os Usuarioes
  async readUsuarios()
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    try 
    {
      const Usuarioes = await UsuarioRepo.find();
      if (Usuarioes) // verifica se ocorreu algum erro na operação
        return Usuarioes;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um Usuario pela identificação (seu id)
  async readUsuario(id: any) 
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);

    try 
    {
      const Usuario_encontrado = await UsuarioRepo.findOne({ id });
      if (Usuario_encontrado) // verifica se ocorreu algum erro na operação
        return Usuario_encontrado; // retorna o Usuario encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco
  async update(id: any, nome: string, cpf: string, email: string, senha: string, eh_estudante: number, data_nasc: Date, genero: string, endereco: string, telefone: string, tem_multa: number) 
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);

    try 
    {
      // verifica se o Usuario relacionado ao id existe no banco
      const getUsuario: any = await UsuarioRepo.findOne(id);
      if (!getUsuario) // se não existir, retorna erro
        throw new Error('Usuario não encontrado!');

      // atualiza o Usuario em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const UsuarioDb: any = await UsuarioRepo.update(
        { id, },
        {
          nome: nome ? nome : getUsuario.nome, 
          cpf: cpf ? cpf : getUsuario.cpf, 
          email: email ? email : getUsuario.email, 
          senha: senha ? senha : getUsuario.senha, 
          data_nasc: data_nasc ? data_nasc : getUsuario.data_nasc, 
          genero: genero ? genero : getUsuario.genero, 
          endereco: endereco ? endereco : getUsuario.endereco, 
          telefone: telefone ? telefone : getUsuario.telefone, 
          eh_estudante: eh_estudante ? eh_estudante : getUsuario.eh_estudante
        }
      );

      if (UsuarioDb) // verifica se ocorreu algum erro na operação
        return UsuarioDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do Usuario
  async delete(id: any) 
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    const Usuario: any = { id };

    try 
    {
      // verifica se o Usuario é encontrado no banco de dados
      const verifica_id = await UsuarioRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Usuario não encontrado!');
      
      const deleta_Usuario = await UsuarioRepo.delete(Usuario);
      if (!deleta_Usuario) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_Usuario;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameUsuario(nome_Usuario: string) 
  {
    const connection = await getConnection();
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    try 
    {
      // verifica se Usuario existe por nome_Usuario
      const busca_Usuario: any = await UsuarioRepo
        .createQueryBuilder('Usuario')
        .where('Usuario.nome = :nome', { nome: nome_Usuario })
        .getOne();
      if(!busca_Usuario) // verifica se ocorreu algum erro na operação
        throw new Error('Usuario não encontrado!');

      return busca_Usuario;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new UsuarioService();
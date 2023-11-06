import { getConnection, getRepository } from 'typeorm';
import BibliotecarioRepository from '../repositories/bibliotecario';
import { Bibliotecario } from '../models/Bibliotecario';

class BibliotecarioService 
{
  // Bibliotecario dados para um Bibliotecario no banco de dados
  async create(nome: string, cpf: string, email: string, senha: string, data_nasc: Date, genero: string, endereco: string, telefone: string, data_admissao: Date, formacao_academica: string)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    const Bibliotecario: any = {nome, cpf, email, senha, data_nasc, genero, endereco, telefone, data_admissao, formacao_academica}; // cria objeto com os dados do Bibliotecario
    
    try 
    {
      // verifica se Bibliotecario já está cadastrado no banco de dados:
       // verifica se o email já foi usado para cadastro
       const verifica_email = await BibliotecarioRepo.findOne({ email });
       if (verifica_email) 
         throw new Error('error_user_already_registered');
 
       // verifica se a matrícula já foi usada para cadastro
       const verifica_matricula = await BibliotecarioRepo.findOne({ cpf });
       if (verifica_matricula)
         throw new Error('error_user_already_registered');

      const BibliotecarioDb: any = await BibliotecarioRepo.save(Bibliotecario); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (BibliotecarioDb)
        return BibliotecarioDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async loginBibliotecario(cpf: string, senha: string)
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    try 
    {
      // verifica o usuário se existe
      const verifica_bibliot: any = await BibliotecarioRepo.findOne({ cpf });
      if (!verifica_bibliot)
        throw new Error('Operação não pode ser realizada');

      // verifica se usuário existente tem a senha enviada
      if (verifica_bibliot.senha != senha)
        throw new Error('Operação não pode ser realizada');

      // retorna id do bibliotecario e a string 'bibliotecario'; informações usadas no programa interativo
      return [verifica_bibliot.id, "bibliotecario"];
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }    
  }

  // retorna todos os Bibliotecarioes
  async readBibliotecarios()
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    try 
    {
      const Bibliotecarios = await BibliotecarioRepo.find();
      if (Bibliotecarios) // verifica se ocorreu algum erro na operação
        return Bibliotecarios;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um Bibliotecario pela identificação (seu id)
  async readBibliotecario(id: any)
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);

    try 
    {
      const Bibliotecario_encontrado = await BibliotecarioRepo.findOne({ id });
      if (Bibliotecario_encontrado) // verifica se ocorreu algum erro na operação
        return Bibliotecario_encontrado; // retorna o Bibliotecario encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco;
  async update(id: any, nome: string, cpf: string, email: string, senha: string, data_nasc: Date, genero: string, endereco: string, telefone: string, data_admissao: Date, formacao_academica: string)
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);

    try 
    {
      // verifica se o Bibliotecario relacionado ao id existe no banco
      const getBibliotecario: any = await BibliotecarioRepo.findOne(id);
      if (!getBibliotecario) // se não existir, retorna erro
        throw new Error('Bibliotecario não encontrado!');

      // atualiza o Bibliotecario em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const BibliotecarioDb: any = await BibliotecarioRepo.update(
        { id, },
        {
          nome: nome ? nome : getBibliotecario.nome, 
          cpf: cpf ? cpf : getBibliotecario.cpf, 
          email: email ? email : getBibliotecario.email, 
          senha: senha ? senha : getBibliotecario.senha, 
          data_nasc: data_nasc ? data_nasc : getBibliotecario.data_nasc, 
          genero: genero ? genero : getBibliotecario.genero, 
          endereco: endereco ? endereco : getBibliotecario.endereco, 
          telefone: telefone ? telefone : getBibliotecario.telefone, 
          data_admissao: data_admissao ? data_admissao : getBibliotecario.data_admissao, 
          formacao_academica: formacao_academica ? formacao_academica : getBibliotecario.formacao_academica
        }
      );

      if (BibliotecarioDb) // verifica se ocorreu algum erro na operação
        return BibliotecarioDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do Bibliotecario
  async delete(id: any) 
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    const Bibliotecario: any = { id };

    try 
    {
      // verifica se o Bibliotecario é encontrado no banco de dados
      const verifica_id = await BibliotecarioRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Bibliotecario não encontrado!');
      
      const deleta_Bibliotecario = await BibliotecarioRepo.delete(Bibliotecario);
      if (!deleta_Bibliotecario) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_Bibliotecario;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameBibliotecario(nome_Bibliotecario: string) 
  {
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    try 
    {
      // verifica se Bibliotecario existe por nome_Bibliotecario
      const busca_Bibliotecario: any = await BibliotecarioRepo
        .createQueryBuilder('bibliotecario')
        .where('Bibliotecario.nome = :nome', { nome: nome_Bibliotecario })
        .getOne();
      if(!busca_Bibliotecario) // verifica se ocorreu algum erro na operação
        throw new Error('Bibliotecario não encontrado!');

      return busca_Bibliotecario;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new BibliotecarioService();
import { getConnection, getRepository } from 'typeorm';
import BibliotecarioRepository from '../repositories/bibliotecario';
import { Bibliotecario } from '../models/Bibliotecario';

class BibliotecarioService 
{
  // Bibliotecario dados para um Bibliotecario no banco de dados
  async create( )
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const BibliotecarioRepo: BibliotecarioRepository = connection.getCustomRepository(BibliotecarioRepository);
    const Bibliotecario: any = { }; // cria objeto com os dados do Bibliotecario
    
    try 
    {
      // verifica se Bibliotecario já está cadastrado no banco de dados
      const verif_aut = await BibliotecarioRepo.findOne(Bibliotecario);
      if (verif_aut) // se Bibliotecario existir, então envia exceção
        throw new Error('Bibliotecario já cadastrado!');

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

  // atualiza dados no banco
  async update(id: any) 
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
          // nome: nome ? nome : getBibliotecario.nome,
          // data_nasc: data_nasc ? data_nasc : getBibliotecario.data_nasc,
          // nacionalidade: nacionalidade ? nacionalidade : getBibliotecario.nacionalidade
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
        .createQueryBuilder('Bibliotecario')
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
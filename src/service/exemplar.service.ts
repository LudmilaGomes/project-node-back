import { getConnection, getRepository } from 'typeorm';
import exemplarRepository from '../repositories/exemplar';
import { Exemplar } from '../models/Exemplar';

class exemplarService 
{
  // exemplar dados para um exemplar no banco de dados
  async create(id_livro: number, quantidade: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);
    const exemplar: any = {id_livro, quantidade}; // cria objeto com os dados do exemplar
    
    try 
    {
      // verifica se exemplar já está cadastrado no banco de dados
      const verif_aut = await exemplarRepo.findOne(exemplar);
      if (verif_aut) // se exemplar existir, então envia exceção
        throw new Error('exemplar já cadastrado!');

      const exemplarDb: any = await exemplarRepo.save(exemplar); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (exemplarDb)
        return exemplarDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os exemplares
  async readExemplares()
  {
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);
    try 
    {
      const exemplares = await exemplarRepo.find();
      if (exemplares) // verifica se ocorreu algum erro na operação
        return exemplares;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um exemplar pela identificação (seu id)
  async readExemplar(id_livro: any) 
  {
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);

    try 
    {
      const exemplar_encontrado = await exemplarRepo.findOne({ id_livro });
      if (exemplar_encontrado) // verifica se ocorreu algum erro na operação
        return exemplar_encontrado; // retorna o exemplar encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco
  async update(id_livro: any, quantidade: number) 
  {
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);

    try 
    {
      // verifica se o exemplar relacionado ao id existe no banco
      const getexemplar: any = await exemplarRepo.findOne(id_livro);
      if (!getexemplar) // se não existir, retorna erro
        throw new Error('exemplar não encontrado!');

      // atualiza o exemplar em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const exemplarDb: any = await exemplarRepo.update(
        { id_livro, },
        {
          // nome: nome ? nome : getexemplar.nome,
          // data_nasc: data_nasc ? data_nasc : getexemplar.data_nasc,
          // nacionalidade: nacionalidade ? nacionalidade : getexemplar.nacionalidade
        }
      );

      if (exemplarDb) // verifica se ocorreu algum erro na operação
        return exemplarDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do exemplar
  async delete(id_livro: any) 
  {
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);
    const exemplar: any = { id_livro };

    try 
    {
      // verifica se o exemplar é encontrado no banco de dados
      const verifica_id = await exemplarRepo.findOne({ id_livro });
      if (!verifica_id) 
        throw new Error('exemplar não encontrado!');
      
      const deleta_exemplar = await exemplarRepo.delete(exemplar);
      if (!deleta_exemplar) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_exemplar;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameExemplar(nome_exemplar: string) 
  {
    const connection = await getConnection();
    const exemplarRepo: exemplarRepository = connection.getCustomRepository(exemplarRepository);
    try 
    {
      // verifica se exemplar existe por nome_exemplar
      const busca_exemplar: any = await exemplarRepo
        .createQueryBuilder('exemplar')
        .where('exemplar.nome = :nome', { nome: nome_exemplar })
        .getOne();
      if(!busca_exemplar) // verifica se ocorreu algum erro na operação
        throw new Error('exemplar não encontrado!');

      return busca_exemplar;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new exemplarService();
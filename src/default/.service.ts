import { getConnection, getRepository } from 'typeorm';
import insereRepository from '../repositories/insere';
import { insere } from '../models/insere';

class insereService 
{
  // insere dados para um insere no banco de dados
  async create( )
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);
    const insere: any = { }; // cria objeto com os dados do insere
    
    try 
    {
      // verifica se insere já está cadastrado no banco de dados
      const verif_aut = await insereRepo.findOne(insere);
      if (verif_aut) // se insere existir, então envia exceção
        throw new Error('insere já cadastrado!');

      const insereDb: any = await insereRepo.save(insere); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (insereDb)
        return insereDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os inserees
  async readinserees()
  {
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);
    try 
    {
      const inserees = await insereRepo.find();
      if (inserees) // verifica se ocorreu algum erro na operação
        return inserees;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um insere pela identificação (seu id)
  async readinsere(id: any) 
  {
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);

    try 
    {
      const insere_encontrado = await insereRepo.findOne({ id });
      if (insere_encontrado) // verifica se ocorreu algum erro na operação
        return insere_encontrado; // retorna o insere encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco
  async update(id: any, nome: string, data_nasc: string, nacionalidade: string) 
  {
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);

    try 
    {
      // verifica se o insere relacionado ao id existe no banco
      const getinsere: any = await insereRepo.findOne(id);
      if (!getinsere) // se não existir, retorna erro
        throw new Error('insere não encontrado!');

      // atualiza o insere em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const insereDb: any = await insereRepo.update(
        { id, },
        {
          // nome: nome ? nome : getinsere.nome,
          // data_nasc: data_nasc ? data_nasc : getinsere.data_nasc,
          // nacionalidade: nacionalidade ? nacionalidade : getinsere.nacionalidade
        }
      );

      if (insereDb) // verifica se ocorreu algum erro na operação
        return insereDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do insere
  async delete(id: any) 
  {
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);
    const insere: any = { id };

    try 
    {
      // verifica se o insere é encontrado no banco de dados
      const verifica_id = await insereRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('insere não encontrado!');
      
      const deleta_insere = await insereRepo.delete(insere);
      if (!deleta_insere) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_insere;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameinsere(nome_insere: string) 
  {
    const connection = await getConnection();
    const insereRepo: insereRepository = connection.getCustomRepository(insereRepository);
    try 
    {
      // verifica se insere existe por nome_insere
      const busca_insere: any = await insereRepo
        .createQueryBuilder('insere')
        .where('insere.nome = :nome', { nome: nome_insere })
        .getOne();
      if(!busca_insere) // verifica se ocorreu algum erro na operação
        throw new Error('insere não encontrado!');

      return busca_insere;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new insereService();
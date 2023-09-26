import { getConnection } from 'typeorm';
import AutorRepository from '../repositories/autor';

class AutorService 
{
  // insere dados para um autor no banco de dados
  async create(nome: string, data_nasc: Date, nacionalidade: string)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const autor: any = { nome, data_nasc, nacionalidade }; // cria objeto com os dados do autor
    
    try 
    {
      // verifica se autor já está cadastrado no banco de dados
      const verif_aut = await autorRepo.findOne(autor);
      if (verif_aut) // se autor existir, então envia exceção
        throw new Error('Autor já cadastrado!');

      const autorDb: any = await autorRepo.save(autor); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (autorDb)
        return autorDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os autores
  async readAutores()
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);

    try 
    {
      const autores = await autorRepo.find();
      if (autores) // verifica se ocorreu algum erro na operação
        return autores;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um autor pela identificação (seu id)
  async readAutor(id: any) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);

    try 
    {
      const autor_encontrado = await autorRepo.findOne({ id });
      if (autor_encontrado) // verifica se ocorreu algum erro na operação
        return autor_encontrado; // retorna o autor encontrado
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
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);

    try 
    {
      // verifica se o autor relacionado ao id existe no banco
      const getAutor: any = await autorRepo.findOne(id);
      if (!getAutor) // se não existir, retorna erro
        throw new Error('Autor não encontrado!');

      // atualiza o autor em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const autorDb: any = await autorRepo.update(
        { id, },
        {
          nome: nome ? nome : getAutor.nome,
          data_nasc: data_nasc ? data_nasc : getAutor.data_nasc,
          nacionalidade: nacionalidade ? nacionalidade : getAutor.nacionalidade
        }
      );

      if (autorDb) // verifica se ocorreu algum erro na operação
        return autorDb;
      else
        throw new Error('Operação não pode ser realizada!'); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do autor
  async delete(id: any) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const autor: any = { id };

    try 
    {
      // verifica se o autor é encontrado no banco de dados
      const verifica_id = await autorRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Autor não encontrado!');
      
      const deleta_autor = await autorRepo.delete(autor);
      if (!deleta_autor) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_autor;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameAutor(nome_autor: string) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);

    try 
    {
      // verifica se autor existe por nome_autor
      const busca_autor: any = await autorRepo
        .createQueryBuilder('autor')
        .where('autor.nome = :nome', { nome: nome_autor })
        .getOne();
      if(!busca_autor) // verifica se ocorreu algum erro na operação
        throw new Error('Autor não encontrado!');

      return busca_autor;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new AutorService();
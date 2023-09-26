import { getConnection } from 'typeorm';
import AutorRepository from '../repositories/autor';

class AutorService 
{
  // ======================//====================== para apresentar - Projetinho 1
  // async createHelp(nome_autor: string, data_nasc: string, nacionalidade: string)
  // {
  //   // estabelece conexão com banco de dados
  //   const connection = await getConnection();
  //   const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
  //   const autor: any = {nome_autor, data_nasc, nacionalidade};
  //   try 
  //   {
  //     const autorDb: any = await autorRepo.save(autor);
  //     console.log("Salvo!");

  //     if (autorDb)
  //       return autorDb; 
  //     else
  //     {
  //       console.log("Socoro1!");
  //       throw new Error('erro_autor_nao_pode_ser_salvo_no_BD');
  //     }
  //   } 
  //   catch 
  //   (e: any) 
  //   {
  //     throw new Error(e.message);
  //   }
  // }

  // ======================//====================== para testar - Projeto 2

  // insere dados para um autor no banco de dados
  async create(nome: string, data_nasc: Date, nacionalidade: string)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const autor: any = { nome, data_nasc, nacionalidade }; // cria objeto com os dados do autor
    
    try 
    {
      const autorDb: any = await autorRepo.save(autor);

      if (autorDb)
        return autorDb;
      else
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readAutores()
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    try 
    {
      const autores = await autorRepo.find();
      if (autores)
        return autores;
      else
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readAutor(id: any) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    try 
    {
      const autor_encontrado = await autorRepo.findOne({ id });
      if (autor_encontrado) 
        return autor_encontrado; // retorna o autor encontrado
      else 
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async update(id: any, nome: string, data_nasc: string, nacionalidade: string) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    try 
    {
      const getAutor: any = await autorRepo.findOne(id);
      if (!getAutor) 
        throw new Error(''); //!

      // atualiza o autor em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const autorDb: any = await autorRepo.update(
        { id, },
        {
          nome: nome ? nome : getAutor.nome,
          data_nasc: data_nasc ? data_nasc : getAutor.data_nasc,
          nacionalidade: nacionalidade ? nacionalidade : getAutor.nacionalidade
        }
      );
      if (autorDb) 
        return autorDb;
      else
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async delete(id: any) 
  {
    const connection = await getConnection();
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const autor: any = { id };
    try 
    {
      const verifica_id = await autorRepo.findOne({ id });

      if (!verifica_id) 
        throw new Error(''); //!
      
      const deleta_autor = await autorRepo.delete(autor);

      if (!deleta_autor) 
        throw new Error(''); //!

      return deleta_autor;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // async searchByNameAutor() 
  // {
    
  // }
}

export default new AutorService();
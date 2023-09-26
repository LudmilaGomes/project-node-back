import { getConnection } from 'typeorm';
import LivroRepository from '../repositories/livro';
import AutorRepository from '../repositories/autor';
import EditoraRepository from '../repositories/editora';
import { Livro } from '../models/Livro';

class LivroService 
{
  // insere dados para um livro no banco de dados
  async create(nome: string, nome_autor: string, nome_editora: string, descricao: string, quantidade: number, data_public: string, genero: string, volume: number, edicao: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    
    try 
    {
      // verificar se autor existe por nome_autor
      const verifica_autor: any = await autorRepo
        .createQueryBuilder('autor')
        .where('autor.nome = :nome', { nome: nome_autor })
        .getOne();
      if(!verifica_autor)
        throw new Error('');

      // verificar se autor existe por nome_autor
      const verifica_editora: any = await editoraRepo
        .createQueryBuilder('editora')
        .where('editora.nome = :nome', { nome: nome_editora })
        .getOne();
      if(!verifica_editora)
        throw new Error('');
      
      // salvar ids de autor e editora nas variáveis: cod_autor, cod_editora
      const cod_editora = verifica_autor.id;
      const cod_autor = verifica_autor.id;

      const livro = {nome, cod_autor, cod_editora, descricao, quantidade, data_public, genero, volume, edicao};
      const livroDb: any = await livroRepo.save(livro);

      if (livroDb)
        return livroDb;
      else
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readLivros(nome_autor: string)
  {
    const connection = await getConnection();
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);
    try 
    {
      const livros = await livroRepo.find();
      if (livros)
        return livros;
      else
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readLivro(id: any) 
  {
    const connection = await getConnection();
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);
    try 
    {
      const livro_encontrado = await livroRepo.findOne({ id });
      if (livro_encontrado) 
        return livro_encontrado; // retorna o livro encontrado
      else 
        throw new Error(''); //!
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async update(id: any, nome: string, nome_autor: string, nome_editora: string, descricao: string, quantidade: number, data_public: Date, genero: string, volume: number, edicao: number) 
  {
    const connection = await getConnection();
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);
    const autorRepo: AutorRepository = connection.getCustomRepository(AutorRepository);
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);

    try 
    {
      const getLivro: any = await livroRepo.findOne(id);
      if (!getLivro) 
        throw new Error(''); //!
      
      // verificar se autor existe por nome_autor
      const verifica_autor: any = await autorRepo
        .createQueryBuilder('autor')
        .where('autor.nome = :nome', { nome: nome_autor })
        .getOne();
      if(!verifica_autor)
        throw new Error('');

      // verificar se autor existe por nome_autor
      const verifica_editora: any = await editoraRepo
        .createQueryBuilder('editora')
        .where('editora.nome = :nome', { nome: nome_editora })
        .getOne();
      if(!verifica_editora)
        throw new Error('');

      const cod_editora = verifica_autor.id;
      const cod_autor = verifica_autor.id;

      // atualiza o livro em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const livroDb: any = await livroRepo.update(
        { id, },
        {
          nome: nome ? nome : getLivro.nome,
          cod_autor: cod_autor ? cod_autor : getLivro.cod_autor,
          cod_editora: cod_editora ? cod_editora : getLivro.cod_editora,
          descricao: descricao ? descricao : getLivro.descricao,
          quantidade: quantidade ? quantidade : getLivro.quantidade,
          data_public: data_public ? data_public : getLivro.data_public,
          genero: genero ? genero : getLivro.genero,
          volume: volume ? volume : getLivro.volume,
          edicao: edicao ? edicao : getLivro.edicao,
        }
      );
      if (livroDb) 
        return livroDb;
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
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);
    const livro: any = { id };
    try 
    {
      const verifica_id = await livroRepo.findOne({ id });

      if (!verifica_id) 
        throw new Error(''); //!
      
      const deleta_livro = await livroRepo.delete(livro);

      if (!deleta_livro) 
        throw new Error(''); //!

      return deleta_livro;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameLivro(nome_livro: string) 
  {
    const connection = await getConnection();
    const livroRepo: LivroRepository = connection.getCustomRepository(LivroRepository);

    try 
    {
      // verificar se livro existe por nome_livro
      const busca_livro: any = await livroRepo
        .createQueryBuilder('livro')
        .where('livro.nome = :nome', { nome: nome_livro })
        .getOne();
      if(!busca_livro)
        throw new Error('');

      return busca_livro;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new LivroService();
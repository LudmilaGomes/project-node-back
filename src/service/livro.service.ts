import { getConnection } from 'typeorm';
import LivroRepository from '../repositories/livro';
import AutorRepository from '../repositories/autor';
import EditoraRepository from '../repositories/editora';

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
      // console.log(verifica_autor);
      if(!verifica_autor)
        throw new Error('Autor não cadastrado!');

      // verificar se editora existe por nome_editora
      const verifica_editora: any = await editoraRepo
        .createQueryBuilder('editora')
        .where('editora.nome = :nome', { nome: nome_editora })
        .getOne();
      // console.log(verifica_editora);
      if(!verifica_editora)
        throw new Error('Editora não cadastrada!');
      
      // salvar ids de autor e editora nas variáveis: cod_autor, cod_editora
      const cod_editora = verifica_editora.id;
      const cod_autor = verifica_autor.id;

      const livro = {nome, cod_autor, cod_editora, descricao, quantidade, data_public, genero, volume, edicao};
      const livroDb: any = await livroRepo.save(livro);

      if (livroDb)
        return livroDb;
      else
        throw new Error('Operação não pode ser realizada!');
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
        throw new Error('Operação não pode ser realizada!');
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
        throw new Error('Operação não pode ser realizada!');
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
      const getLivro: any = await livroRepo
        .createQueryBuilder('livro')
        .innerJoinAndSelect('livro.cod_autor', 'autor')
        .innerJoinAndSelect('livro.cod_editora', 'editora')
        .where('livro.id = :id', { id: id })
        .getOne();
      if (!getLivro) 
        throw new Error('Livro não encontrado!');
      
      let verifica_autor, verifica_editora, cod_editora, cod_autor;

      // se nome_autor for diferente de uma string vazia, significa que 
      // o usuário quer atualizar o nome do autor e precisamos verificar...
      if(nome_autor)
      {
        // ...verificar se autor existe por nome_autor
        verifica_autor = await autorRepo
          .createQueryBuilder('autor')
          .where('autor.nome = :nome', { nome: nome_autor })
          .getOne();
        if(!verifica_autor)
          throw new Error('Autor não encontrado!');
        cod_autor = verifica_autor.id;
      }
      
      // se nome_editora for diferente de uma string vazia, significa que 
      // o usuário quer atualizar o nome da editora e precisamos verificar...
      if(nome_editora)
      {
        // ... verificar se editora existe por nome_editora
        verifica_editora = await editoraRepo
          .createQueryBuilder('editora')
          .where('editora.nome = :nome', { nome: nome_editora })
          .getOne();
        if(!verifica_editora)
          throw new Error('Editora não encontrada!');
        cod_editora = verifica_editora.id;
      }

      // atualiza o livro em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const livroDb: any = await livroRepo.update(
        { id, },
        {
          nome: nome ? nome : getLivro.nome,
          cod_autor: cod_autor ? cod_autor : getLivro.cod_autor.id,
          cod_editora: cod_editora ? cod_editora : getLivro.cod_editora.id,
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
        throw new Error('Operação não pode ser realizada!');
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
        throw new Error('Livro não encontrado!');
      
      const deleta_livro = await livroRepo.delete(livro);

      if (!deleta_livro) 
        throw new Error('Operação não pode ser realizada!');

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
        throw new Error('Operação não pode ser realizada!');

      return busca_livro;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new LivroService();
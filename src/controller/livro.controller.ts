import { LivroService } from '../service/index.service';
import { Request, Response } from 'express';

class LivroController
{
  async create(request: Request, response: Response) 
  {
    const { nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao } = request.body;
    try 
    {
      const livro = await LivroService.create(nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao);
      return response.status(200).json(livro);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readLivros(request: Request, response: Response) 
  {
    const { nome_autor } = request.body;
    try 
    {
      const livro = await LivroService.readLivros(nome_autor);
      return response.status(200).json(livro); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readLivro(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const livro = await LivroService.readLivro(id);
      return response.status(200).json(livro); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateLivro(request: Request, response: Response) 
  {
    const { nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao } = request.body;
    const id = request.params.id;
    try 
    {
      const livro = await LivroService.update(id, nome, nome_autor, nome_editora, descricao, quantidade, data_public, genero, volume, edicao);
      return response.status(200).json(livro);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteLivro(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const livro = await LivroService.delete(id);
      return response.status(200).json(livro);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameLivro(request: Request, response: Response) 
  {
    const { nome_livro } = request.body;
    try 
    {
      const livro = await LivroService.searchByNameLivro(nome_livro);
      return response.status(200).json(livro);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new LivroController() ;
import { AutorService } from '../service/index.service';
import { Request, Response } from 'express';

class AutorController
{
  async create(request: Request, response: Response) 
  {
    const { nome, data_nasc, nacionalidade } = request.body;
    try 
    {
      const autor = await AutorService.create(nome, data_nasc, nacionalidade);
      return response.status(200).json(autor);
    } 
    catch (e: any) 
    {
      if (e.message == 'Autor já cadastrado!' || e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readAutores(request: Request, response: Response) 
  {
    try 
    {
      const autor = await AutorService.readAutores() ;
      return response.status(200).json(autor); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == 'Operação não pode ser realizada!') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readAutor(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const autor = await AutorService.readAutor(id);
      return response.status(200).json(autor); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == 'Operação não pode ser realizada!') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateAutor(request: Request, response: Response) 
  {
    const { nome, data_nasc, nacionalidade } = request.body;
    const id = request.params.id;
    try 
    {
      const autor = await AutorService.update(id, nome, data_nasc, nacionalidade);
      return response.status(200).json(autor);
    } 
    catch (e: any) 
    {
      if (e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteAutor(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const autor = await AutorService.delete(id);
      return response.status(200).json(autor);
    } 
    catch (e: any) 
    {
      if (e.message == 'Operação não pode ser realizada!' || e.message == 'Autor não encontrado!') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameAutor(request: Request, response: Response) 
  {
    const { nome_autor } = request.body;
    try 
    {
      const autor = await AutorService.searchByNameAutor(nome_autor);
      return response.status(200).json(autor);
    } 
    catch (e: any) 
    {
      if (e.message == 'Autor não encontrado!')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new AutorController() ;
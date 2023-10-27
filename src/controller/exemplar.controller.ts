import { ExemplarService } from '../service/index.service';
import { Request, Response } from 'express';

class ExemplarController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const exemplar = await ExemplarService.create( );
      return response.status(200).json(exemplar);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readExemplares(request: Request, response: Response) 
  {
    try 
    {
      const exemplar = await ExemplarService.readExemplares();
      return response.status(200).json(exemplar); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readExemplar(request: Request, response: Response) 
  {
    const id_livro = request.params.id;
    try 
    {
      const exemplar = await ExemplarService.readExemplar(id_livro);
      return response.status(200).json(exemplar); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateExemplar(request: Request, response: Response) 
  {
    const {  } = request.body;
    const id_livro = request.params.id;
    try 
    {
      const exemplar = await ExemplarService.update(id_livro);
      return response.status(200).json(exemplar);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteExemplar(request: Request, response: Response) 
  {
    const id_livro = request.params.id;
    try 
    {
      const exemplar = await ExemplarService.delete(id_livro);
      return response.status(200).json(exemplar);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameExemplar(request: Request, response: Response) 
  {
    const nome_exemplar = request.params.nome;
    try 
    {
      const exemplar = await ExemplarService.searchByNameExemplar(nome_exemplar);
      return response.status(200).json(exemplar);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new ExemplarController();
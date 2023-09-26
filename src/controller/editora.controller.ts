import { EditoraService } from '../service/index.service';
import { Request, Response } from 'express';

class EditoraController
{
  async create(request: Request, response: Response) 
  {
    const { nome, endereco, num_telefone, email, site, ano_fundacao } = request.body;
    try 
    {
      const editora = await EditoraService.create(nome, endereco, num_telefone, email, site, ano_fundacao);
      return response.status(200).json(editora);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readEditoras(request: Request, response: Response) 
  {
    try 
    {
      const editora = await EditoraService.readEditoras() ;
      return response.status(200).json(editora); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readEditora(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const editora = await EditoraService.readEditora(id);
      return response.status(200).json(editora); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateEditora(request: Request, response: Response) 
  {
    const { nome, endereco, num_telefone, email, site, ano_fundacao } = request.body;
    const id = request.params.id;
    try 
    {
      const editora = await EditoraService.update(id, nome, endereco, num_telefone, email, site, ano_fundacao);
      return response.status(200).json(editora);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteEditora(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const editora = await EditoraService.delete(id);
      return response.status(200).json(editora);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameEditora(request: Request, response: Response) 
  {
    const { nome_editora } = request.body;
    try 
    {
      const editora = await EditoraService.searchByNameEditora(nome_editora);
      return response.status(200).json(editora);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new EditoraController() ;
import { InsereService } from '../service/index.service';
import { Request, Response } from 'express';

class InsereController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const insere = await InsereService.create( );
      return response.status(200).json(insere);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readInseres(request: Request, response: Response) 
  {
    try 
    {
      const insere = await InsereService.readInserees();
      return response.status(200).json(insere); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readInsere(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const insere = await InsereService.readInsere(id);
      return response.status(200).json(insere); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateInsere(request: Request, response: Response) 
  {
    const {  } = request.body;
    const id = request.params.id;
    try 
    {
      const insere = await InsereService.update(id,  );
      return response.status(200).json(insere);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteInsere(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const insere = await InsereService.delete(id);
      return response.status(200).json(insere);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameInsere(request: Request, response: Response) 
  {
    const nome_insere = request.params.nome;
    try 
    {
      const insere = await InsereService.searchByNameInsere(nome_insere);
      return response.status(200).json(insere);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new InsereController();
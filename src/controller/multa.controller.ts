import { MultaService } from '../service/index.service';
import { Request, Response } from 'express';

class MultaController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const multa = await MultaService.create( );
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readMultas(request: Request, response: Response) 
  {
    try 
    {
      const multa = await MultaService.readMultas();
      return response.status(200).json(multa); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readMulta(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const multa = await MultaService.readMulta(id);
      return response.status(200).json(multa); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateMulta(request: Request, response: Response) 
  {
    const {  } = request.body;
    const id = request.params.id;
    try 
    {
      const multa = await MultaService.update(id);
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteMulta(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const multa = await MultaService.delete(id);
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameMulta(request: Request, response: Response) 
  {
    const nome_multa = request.params.nome;
    try 
    {
      const multa = await MultaService.searchByNameMulta(nome_multa);
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new MultaController();
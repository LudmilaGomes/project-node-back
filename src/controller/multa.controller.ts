import { MultaService } from '../service/index.service';
import { Request, Response } from 'express';

class MultaController
{
  async create(request: Request, response: Response) 
  {
    const {id_emprestimo} = request.body;
    try 
    {
      const multa = await MultaService.create(id_emprestimo);
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateValorMulta(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const multa = await MultaService.updateValorMulta(id);
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
  
  async updateStatusMulta(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const multa = await MultaService.updateStatusMulta(id);
      return response.status(200).json(multa);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }

  async searchByUsuarioMulta(request: Request, response: Response) 
  {
    const id = request.params.nome;
    try 
    {
      const multa = await MultaService.searchByUsuarioMulta(id);
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
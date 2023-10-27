import { BibliotecarioService } from '../service/index.service';
import { Request, Response } from 'express';

class BibliotecarioController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const bibliotecario = await BibliotecarioService.create( );
      return response.status(200).json(bibliotecario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readBibliotecarios(request: Request, response: Response) 
  {
    try 
    {
      const bibliotecario = await BibliotecarioService.readBibliotecarios();
      return response.status(200).json(bibliotecario); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readBibliotecario(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const bibliotecario = await BibliotecarioService.readBibliotecario(id);
      return response.status(200).json(bibliotecario); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateBibliotecario(request: Request, response: Response) 
  {
    const { } = request.body;
    const id = request.params.id;
    try 
    {
      const bibliotecario = await BibliotecarioService.update(id);
      return response.status(200).json(bibliotecario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteBibliotecario(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const bibliotecario = await BibliotecarioService.delete(id);
      return response.status(200).json(bibliotecario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameBibliotecario(request: Request, response: Response) 
  {
    const nome_bibliotecario = request.params.nome;
    try 
    {
      const bibliotecario = await BibliotecarioService.searchByNameBibliotecario(nome_bibliotecario);
      return response.status(200).json(bibliotecario);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new BibliotecarioController();
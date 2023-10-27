import { UsuarioService } from '../service/index.service';
import { Request, Response } from 'express';

class UsuarioController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const usuario = await UsuarioService.create( );
      return response.status(200).json(usuario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readUsuarios(request: Request, response: Response) 
  {
    try 
    {
      const usuario = await UsuarioService.readUsuarios();
      return response.status(200).json(usuario); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readUsuario(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const usuario = await UsuarioService.readUsuario(id);
      return response.status(200).json(usuario); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateUsuario(request: Request, response: Response) 
  {
    const {  } = request.body;
    const id = request.params.id;
    try 
    {
      const usuario = await UsuarioService.update(id);
      return response.status(200).json(usuario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteUsuario(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const usuario = await UsuarioService.delete(id);
      return response.status(200).json(usuario);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameUsuario(request: Request, response: Response) 
  {
    const nome_usuario = request.params.nome;
    try
    {
      const usuario = await UsuarioService.searchByNameUsuario(nome_usuario);
      return response.status(200).json(usuario);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new UsuarioController();
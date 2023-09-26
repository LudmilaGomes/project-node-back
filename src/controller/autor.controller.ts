import { AutorService } from '../service/index.service';
import { Request, Response } from 'express';

class AutorController
{
//   // ======================//====================== para apresentar - Projetinho 1
//   async createHelp(nome_autor: string, data_nasc: string, nacionalidade: string)
//   {
//     try 
//     {
//       const autor = await AutorService.createHelp(nome_autor, data_nasc, nacionalidade);
//       console.log("Socoro2!");
//       return autor;
//       // return response.status(200).json(autor);
//     } 
//     catch (e: any) 
//     {
//       if (e.message == 'erro_autor_nao_pode_ser_salvo_no_BD')
//       {
//         console.log("Socoro2!");
//         console.error("Erro ao criar autor:", e);
//         return 124;
//       }
        
//       // if (e.message == 'error_autor_already_registered' || e.message == 'error_autor_cannot_be_registered' 
//       //     || e.message == 'error_autor_cannot_be_saved')
//         // return response.status(409).json(e.message);

//       // return response.status(500).json(e.message);
//     }
//   }

  // ======================//====================== para testar - Projeto 2

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
      if (e.message == '' || e.message == '' || e.message == '')
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
      if (e.message == '') 
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
      if (e.message == '') 
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
      if (e.message == '' || e.message == '') 
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
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  // async searchByNameAutor() 
  // {
    
  // }
}

export default new AutorController() ;
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

  // async create(nome_autor: string, data_nasc: Date, nacionalidade: string)
  // {
  //   try 
  //   {
  //     const editora = await EditoraService.create(nome_autor, data_nasc, nacionalidade);
  //     console.log("Socoro2!");
  //     return editora;
  //     // return response.status(200).json(editora);
  //   } 
  //   catch (e: any) 
  //   {
  //     if (e.message == 'erro_autor_nao_pode_ser_salvo_no_BD')
  //     {
  //       console.log("Socoro2!");
  //       console.error("Erro ao criar autor:", e);
  //       return 124;
  //     }
        
  //     // if (e.message == 'error_editora_already_registered' || e.message == 'error_editora_cannot_be_registered' 
  //     //     || e.message == 'error_editora_cannot_be_saved')
  //       // return response.status(409).json(e.message);

  //     // return response.status(500).json(e.message);
  //   }
  // }

  // async searchByNameEditora() 
  // {
    
  // }
}

export default new EditoraController() ;
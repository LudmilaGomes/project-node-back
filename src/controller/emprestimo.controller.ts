import { EmprestimoService } from '../service/index.service';
import { Request, Response } from 'express';

class EmprestimoController
{
  async create(request: Request, response: Response) 
  {
    const { } = request.body;
    try 
    {
      const emprestimo = await EmprestimoService.create( );
      return response.status(200).json(emprestimo);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '' || e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async readEmprestimos(request: Request, response: Response) 
  {
    try 
    {
      const emprestimo = await EmprestimoService.readEmprestimos();
      return response.status(200).json(emprestimo); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async readEmprestimo(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const emprestimo = await EmprestimoService.readEmprestimo(id);
      return response.status(200).json(emprestimo); // resource found
    } 
    catch (e: any) 
    {
      if (e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
  
  async updateEmprestimo(request: Request, response: Response) 
  {
    const {  } = request.body;
    const id = request.params.id;
    try 
    {
      const emprestimo = await EmprestimoService.update(id);
      return response.status(200).json(emprestimo);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);
    
      return response.status(500).json(e.message);
    }
  }
  
  async deleteEmprestimo(request: Request, response: Response) 
  {
    const id = request.params.id;
    try 
    {
      const emprestimo = await EmprestimoService.delete(id);
      return response.status(200).json(emprestimo);
    } 
    catch (e: any) 
    {
      if (e.message == '' || e.message == '') 
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }

  async searchByNameEmprestimo(request: Request, response: Response) 
  {
    const nome_emprestimo = request.params.nome;
    try 
    {
      const emprestimo = await EmprestimoService.searchByNameEmprestimo(nome_emprestimo);
      return response.status(200).json(emprestimo);
    } 
    catch (e: any) 
    {
      if (e.message == '')
        return response.status(409).json(e.message);

      return response.status(500).json(e.message);
    }
  }
}

export default new EmprestimoController();
import { EmprestimoService } from '../service/index.service';
import { Request, Response } from 'express';

class EmprestimoController
{
  async create(request: Request, response: Response)
  {
    const {id_usuario, id_exemplar, id_bibliotecario} = request.body;
    try 
    {
      const emprestimo = await EmprestimoService.create(id_usuario, id_exemplar, id_bibliotecario);
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
    const id = request.params.id; // id do empréstimo
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
  
  async updateLivroDevolvido(request: Request, response: Response) 
  {
    const {tem_multa} = request.body; // atualiza se emprestimo tem multa
    const id = request.params.id;
    try 
    {
      const emprestimo = await EmprestimoService.updateLivroDevolvido(id);
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

  async searchByUsuarioEmprestimo(request: Request, response: Response) 
  {
    const id = request.params.id; // id do usuário
    try 
    {
      const emprestimo = await EmprestimoService.searchByUsuarioEmprestimo(id);
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
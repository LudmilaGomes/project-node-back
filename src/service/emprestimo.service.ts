import { getConnection, getRepository } from 'typeorm';
import EmprestimoRepository from '../repositories/emprestimo';
import { Emprestimo } from '../models/Emprestimo';

class EmprestimoService 
{
  // Emprestimo dados para um Emprestimo no banco de dados
  async create( )
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    const Emprestimo: any = { }; // cria objeto com os dados do Emprestimo
    
    try 
    {
      // verifica se Emprestimo já está cadastrado no banco de dados
      const verif_aut = await EmprestimoRepo.findOne(Emprestimo);
      if (verif_aut) // se Emprestimo existir, então envia exceção
        throw new Error('Emprestimo já cadastrado!');

      const EmprestimoDb: any = await EmprestimoRepo.save(Emprestimo); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (EmprestimoDb)
        return EmprestimoDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os Emprestimoes
  async readEmprestimos()
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    try 
    {
      const Emprestimos = await EmprestimoRepo.find();
      if (Emprestimos) // verifica se ocorreu algum erro na operação
        return Emprestimos;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um Emprestimo pela identificação (seu id)
  async readEmprestimo(id: any) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);

    try 
    {
      const Emprestimo_encontrado = await EmprestimoRepo.findOne({ id });
      if (Emprestimo_encontrado) // verifica se ocorreu algum erro na operação
        return Emprestimo_encontrado; // retorna o Emprestimo encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco
  async update(id: any) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);

    try 
    {
      // verifica se o Emprestimo relacionado ao id existe no banco
      const getEmprestimo: any = await EmprestimoRepo.findOne(id);
      if (!getEmprestimo) // se não existir, retorna erro
        throw new Error('Emprestimo não encontrado!');

      // atualiza o Emprestimo em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const EmprestimoDb: any = await EmprestimoRepo.update(
        { id, },
        {
          // nome: nome ? nome : getEmprestimo.nome,
          // data_nasc: data_nasc ? data_nasc : getEmprestimo.data_nasc,
          // nacionalidade: nacionalidade ? nacionalidade : getEmprestimo.nacionalidade
        }
      );

      if (EmprestimoDb) // verifica se ocorreu algum erro na operação
        return EmprestimoDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do Emprestimo
  async delete(id: any) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    const Emprestimo: any = { id };

    try 
    {
      // verifica se o Emprestimo é encontrado no banco de dados
      const verifica_id = await EmprestimoRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Emprestimo não encontrado!');
      
      const deleta_Emprestimo = await EmprestimoRepo.delete(Emprestimo);
      if (!deleta_Emprestimo) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_Emprestimo;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByNameEmprestimo(nome_Emprestimo: string) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    try 
    {
      // verifica se Emprestimo existe por nome_Emprestimo
      const busca_Emprestimo: any = await EmprestimoRepo
        .createQueryBuilder('Emprestimo')
        .where('Emprestimo.nome = :nome', { nome: nome_Emprestimo })
        .getOne();
      if(!busca_Emprestimo) // verifica se ocorreu algum erro na operação
        throw new Error('Emprestimo não encontrado!');

      return busca_Emprestimo;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new EmprestimoService();
import { getConnection, getRepository } from 'typeorm';
import MultaRepository from '../repositories/multa';
import { Multa } from '../models/Multa';

class MultaService 
{
  // Multa dados para um Multa no banco de dados
  async create(id_usuario: any, id_emprestimo: any, valor_multa: number, data_limite: Date, data_hoje: Date, multa_paga: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    const Multa: any = {id_usuario, id_emprestimo, valor_multa, data_limite, data_hoje, multa_paga}; // cria objeto com os dados do Multa
    
    try 
    {
      // verifica se Multa já está cadastrado no banco de dados
      const verif_aut = await MultaRepo.findOne(Multa);
      if (verif_aut) // se Multa existir, então envia exceção
        throw new Error('Multa já cadastrado!');

      const MultaDb: any = await MultaRepo.save(Multa); // salva no banco

      // para o caso de ocorrer algum erro na operação
      if (MultaDb)
        return MultaDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna todos os Multas
  async readMultas()
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    try 
    {
      const Multas = await MultaRepo.find();
      if (Multas) // verifica se ocorreu algum erro na operação
        return Multas;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // retorna apenas um Multa pela identificação (seu id)
  async readMulta(id: any) 
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);

    try 
    {
      const Multa_encontrado = await MultaRepo.findOne({ id });
      if (Multa_encontrado) // verifica se ocorreu algum erro na operação
        return Multa_encontrado; // retorna o Multa encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // atualiza dados no banco
  async update(id: any, id_usuario: any, id_emprestimo: any, valor_multa: number, data_limite: Date, data_hoje: Date, multa_paga: number) 
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);

    try 
    {
      // verifica se o Multa relacionado ao id existe no banco
      const getMulta: any = await MultaRepo.findOne(id);
      if (!getMulta) // se não existir, retorna erro
        throw new Error('Multa não encontrado!');

      // atualiza o Multa em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const MultaDb: any = await MultaRepo.update(
        { id, },
        {
          // nome: nome ? nome : getMulta.nome,
          // data_nasc: data_nasc ? data_nasc : getMulta.data_nasc,
          // nacionalidade: nacionalidade ? nacionalidade : getMulta.nacionalidade
        }
      );

      if (MultaDb) // verifica se ocorreu algum erro na operação
        return MultaDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // deleta um registro a partir do id do Multa
  async delete(id: any) 
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    const Multa: any = { id };

    try 
    {
      // verifica se o Multa é encontrado no banco de dados
      const verifica_id = await MultaRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Multa não encontrado!');
      
      const deleta_Multa = await MultaRepo.delete(Multa);
      if (!deleta_Multa) // verifica se ocorreu algum erro na operação
        throw new Error('Operação não pode ser realizada!');

      return deleta_Multa;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async searchByUsuarioMulta(id_usuario: any) 
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    try 
    {
      // verifica se Multa existe por nome_Multa
      const busca_Multa: any = await MultaRepo
        .createQueryBuilder('multa')
        .where('multa.id_usuario = :id_usuario', { id_usuario: id_usuario })
        .getOne();
      if(!busca_Multa) // verifica se ocorreu algum erro na operação
        throw new Error('Multa não encontrado!');

      return busca_Multa;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new MultaService();
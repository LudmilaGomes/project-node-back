import { getConnection, getRepository } from 'typeorm';
import MultaRepository from '../repositories/multa';
import EmprestimoRepository from '../repositories/emprestimo';
import UsuarioRepository from '../repositories/usuario';
import { EmprestimoController } from '../controller/index.controller';

class MultaService 
{
  // pegamos todos os dados necessários a partir de id_emprestimo (id_usuario, data_limite)
  // definimos valor_multa base como const, para cada dia depois da data_limite, soma um adicional ao valor
  // ideia: ao usar o programa interativo, um método que verifica se todos os empréstimos têm multas é executado
  // (loop por todos os empréstimos, salvando os ids dos empréstimos numa lista; a partir disso, para cada
  // id, usa o método Multa.create(), que irá verificar se há multa ou incrementar valor adicional ao valor base)
  async create(id_emprestimo: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);
    
    try
    {
      const busca_Emprestimo1: any = await EmprestimoRepo
        .createQueryBuilder('emprestimo')
        .where('emprestimo.id = :id', { id: id_emprestimo })
        .innerJoinAndSelect('emprestimo.id_usuario', 'usuario')
        .innerJoinAndSelect('emprestimo.tem_multa', 'estado_bool')
        .getOne();
        
      const busca_Emprestimo2: any = await EmprestimoRepo
      .createQueryBuilder('emprestimo')
      .where('emprestimo.id = :id', { id: id_emprestimo })
      .innerJoinAndSelect('emprestimo.livro_devolvido', 'estado_bool')
      .getOne();

      const id_usuario = busca_Emprestimo1.id_usuario.id;
      const data_limite: Date = busca_Emprestimo1.data_devolucao;
      const data_hoje = new Date();
      const livro_devolvido = busca_Emprestimo2.livro_devolvido.id;
      
      if (data_hoje < data_limite) // prazo para entrega não foi atingido
      {
        // não há multa, pois data limite para entrega não foi alcançado
        console.log(`Não há multa para o empréstimo de id ${id_emprestimo}.`);
        return 'Não há multa para o empréstimo'; // função para de executar pois não há multa para ser salva
      }

      if (livro_devolvido == 1) // livro foi entregue
      {
        // não há multa, pois livro foi entregue
        console.log(`Não há multa para o empréstimo de id ${id_emprestimo}.`);
        return 'Não há multa para o empréstimo'; // função para de executar pois não há multa para ser salva
      }

      // usuário não devolveu livro e pagará multa
      // verifica se empréstimo já tem multa
      if (busca_Emprestimo1.tem_multa.id == 1) // se Multa existir, então envia exceção
      {
        console.log('Multa já existe no sistema!');
        return;
      }
        
      // indica que empréstimo tem multa no banco de dados
      var id = id_emprestimo;
      const emprestimo_tem_multa: any = await EmprestimoRepo.update(
        { id, },
        {
          tem_multa: 1 // 1 - true; há multa relacionada ao empréstimo
        }
      );
      
      // indica que usuário tem multa
      id = id_usuario;
      const usuario_tem_multa: any = await UsuarioRepo.update(
        { id, },
        {
          tem_multa: 1 // 1 - true; há multa relacionada ao empréstimo
        }
      );

      if (!(emprestimo_tem_multa && usuario_tem_multa))
        throw new Error('Operação não pode ser realizada!');

      const multa_paga = 0; // indica que a multa não foi paga
      const valor_multa = 1;

      const Multa: any = {id_usuario, id_emprestimo, valor_multa, data_limite, data_hoje, multa_paga};
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

  // atualiza valor das multas
  async updateValorMulta(id: any)
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    try 
    {
      const Multa = await MultaRepo.findOne(id);
      if (!Multa) // se não existir, retorna erro
        throw new Error('Multa não encontrada!');
        
      const busca_Multa: any = await MultaRepo
      .createQueryBuilder('multa')
      .where('multa.id = :id', { id: id })
      .innerJoinAndSelect('multa.multa_paga', 'estado_bool')
      .getOne();

      if (busca_Multa.multa_paga.id == 1) // multa paga, não atualizamos o valor da multa
      {
        console.log('Multa foi paga!');
        return 'Multa foi paga!';
      }

      var dataHoje = new Date(Multa.data_hoje);
      var dataLimite = new Date(Multa.data_limite);
      // calcula a diferença de dias entre a data de hoje e a data limite
      var diffEmDias = Math.floor((dataHoje - dataLimite) / (1000 * 60 * 60 * 24));
      // Incrementa a multa em R$1 por dia de atraso
      const valor_multa: number = diffEmDias;

      const MultaDb: any = await MultaRepo.update(
        { id, },
        {
          valor_multa: valor_multa
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

  // retorna apenas uma Multa pela identificação (seu id)
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

  // retira status de que há multa no empréstimo
  async updateStatusMulta(id: any) // id da multa
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);

    try 
    {
      // verifica se o Multa relacionado ao id existe no banco
      const getMulta: any = await MultaRepo.findOne(id);
      if (!getMulta) // se não existir, retorna erro
        throw new Error('Multa não encontrada!');

      const busca_Multa: any = await MultaRepo
      .createQueryBuilder('multa')
      .where('multa.id = :id', { id: id })
      .innerJoinAndSelect('multa.id_usuario', 'usuario')
      .innerJoinAndSelect('multa.id_emprestimo', 'emprestimo')
      .innerJoinAndSelect('multa.multa_paga', 'estado_bool')
      .getOne();

      // atualiza a Multa em questão
      const MultaDb: any = await MultaRepo.update(
        { id, },
        {
          multa_paga: 1
        }
      );

      // indica que usuário não tem multa
      const id_usuario = busca_Multa.id_usuario.id;
      const usuario_tem_multa: any = await UsuarioRepo.update(
        { id: id_usuario, },
        {
          tem_multa: 0 // 0 - false; não há multa relacionada ao usuário
        }
      );

      // indica que empréstimo teve livro devolvido e a multa foi paga
      const id_emprestimo = busca_Multa.id_emprestimo.id;
      const emprestimo_concluido: any = await EmprestimoRepo.update(
        { id: id_emprestimo, },
        {
          livro_devolvido: 1,
          status: 'concluido'
        }
      );

      if (MultaDb && usuario_tem_multa && emprestimo_concluido) // verifica se ocorreu algum erro na operação
        return MultaDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  // busca multas de um usuário
  async searchByUsuarioMulta(id: any) 
  {
    const connection = await getConnection();
    const MultaRepo: MultaRepository = connection.getCustomRepository(MultaRepository);
    try 
    {
      // verifica se Multa existe por nome_Multa
      const busca_Multa: any = await MultaRepo
        .createQueryBuilder('multa')
        .where('multa.id_usuario = :id_usuario', { id_usuario: id })
        .getMany();
      if(!busca_Multa) // verifica se ocorreu algum erro na operação
        throw new Error('Multas não encontradas!');

      return busca_Multa;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new MultaService();
import { getConnection, getRepository } from 'typeorm';
import EmprestimoRepository from '../repositories/emprestimo';
import ExemplarRepository from '../repositories/exemplar';
import { ExemplarService } from './index.service';
import UsuarioRepository from '../repositories/usuario';

class EmprestimoService 
{
  // Insere dados para um Emprestimo no banco de dados
  async create(id_usuario: number, id_exemplar: number, id_bibliotecario: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    const ExemplarRepo: ExemplarRepository = connection.getCustomRepository(ExemplarRepository);
    const UsuarioRepo: UsuarioRepository = connection.getCustomRepository(UsuarioRepository);

    // valores importantes para realização de empréstimo
    const data_realizacao = new Date(); // data de hoje
    // data de devolução é definida como: data de hoje + 1 mês
    const data_devolucao = new Date(data_realizacao.getFullYear(), (data_realizacao.getMonth()) + 1, data_realizacao.getDay());
    const tem_multa = 0; // empréstimo cadastrado não possui multa
    const livro_devolvido = 0; // empréstimo que acabou de ser cadastrado não teve livro devolvido
    const status = 'andamento';

    const Emprestimo: any = {id_usuario, id_exemplar, id_bibliotecario, tem_multa, data_realizacao, data_devolucao, livro_devolvido, status}; // cria objeto com os dados do Emprestimo
    
    try 
    {
      // verifica se Exemplar está cadastrado no banco de dados
      const busca_Exemplar: any = await ExemplarRepo
        .createQueryBuilder('exemplar')
        .where('exemplar.id_livro = :id_livro', { id_livro: id_exemplar })
        .getOne();
      if(!busca_Exemplar) // verifica se ocorreu algum erro na operação
        throw new Error('Exemplar não encontrado!');

      
      // verifica se Usuário está cadastrado no banco de dados
      const busca_Usuario: any = await UsuarioRepo
        .createQueryBuilder('usuario')
        .where('usuario.id = :id', { id: id_usuario })
        .innerJoinAndSelect('usuario.tem_multa', 'estado_bool')
        .getOne();
      if(!busca_Usuario) // verifica se ocorreu algum erro na operação
        throw new Error('Exemplar não encontrado!');

      // se usuario possuir uma multa, isso consta no sistema e ele nao pode fazer emprestimos
      if (busca_Usuario.tem_multa.id == 1) 
      {
        console.log('Usuario possui multa e nao pode realizar emprestimo!');
        throw new Error('Usuario possui multa e nao pode realizar emprestimo!');
      }

      // verifica se quantidade de exemplares é menor que 5 | 5 é a quantidade crítica
      // não pode deixar faltar exemplares de um livro e o limite estabelecido foi 5
      if (busca_Exemplar.quantidade == 5)
        throw new Error('Quantidade de exemplares é mínima e o empréstimo não pode ser feito!');

      // se não há erro, atualizamos o valor da quantidade de livros (quantidade - 1)
      const atualiza_exemplar = await ExemplarService.update(id_exemplar, (busca_Exemplar.quantidade - 1));
      if (!atualiza_exemplar) 
        throw new Error('Operação não pode ser realizada!');
      
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

  // indica no banco de dados que o livro foi devolvido
  async updateLivroDevolvido(id: any) // id do empréstimo
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);

    try 
    {
      // verifica se o Emprestimo relacionado ao id existe no banco
      const getEmprestimo: any = await EmprestimoRepo.findOne(id);
      if (!getEmprestimo) // se não existir, retorna erro
        throw new Error('Emprestimo não encontrado!');

      // atualiza o Emprestimo
      const EmprestimoDb: any = await EmprestimoRepo.update(
        { id, },
        {
          livro_devolvido: 1,
          status: 'concluido'
        }
      );

      const busca_Emprestimo: any = await EmprestimoRepo
        .createQueryBuilder('emprestimo')
        .where('emprestimo.id = :id', { id: id })
        // .innerJoin('emprestimo.id_exemplar', 'exemplar')
        .innerJoinAndSelect('emprestimo.id_exemplar', 'exemplar')
        .getMany();
      if(!busca_Emprestimo) // verifica se ocorreu algum erro na operação
        throw new Error('Empréstimos não encontrados!');

      const id_exemplar = busca_Emprestimo[0].id_exemplar.id_livro;
      const quant_exemplar = busca_Emprestimo[0].id_exemplar.quantidade;

      const atualiza_exemplar = await ExemplarService.update(id_exemplar, (quant_exemplar + 1));
      if (!atualiza_exemplar)
        throw new Error('Operação não pode ser realizada!');

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

  async searchByUsuarioEmprestimo(id: any) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    try 
    {
      // encontra empréstimos de um usuário
      const busca_Emprestimo: any = await EmprestimoRepo
        .createQueryBuilder('emprestimo')
        .where('emprestimo.id_usuario = :id_usuario', { id_usuario: id })
        .getMany();
      if(!busca_Emprestimo) // verifica se ocorreu algum erro na operação
        throw new Error('Empréstimos não encontrados!');

      return busca_Emprestimo;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
  
  async searchByBibliotEmprestimo(id: any) 
  {
    const connection = await getConnection();
    const EmprestimoRepo: EmprestimoRepository = connection.getCustomRepository(EmprestimoRepository);
    try 
    {
      // encontra empréstimos de um usuário
      const busca_Emprestimo: any = await EmprestimoRepo
        .createQueryBuilder('emprestimo')
        .where('emprestimo.id_bibliotecario = :id_bibliotecario', { id_bibliotecario: id })
        .getMany();
      if(!busca_Emprestimo) // verifica se ocorreu algum erro na operação
        throw new Error('Empréstimos não encontrados!');

      return busca_Emprestimo;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new EmprestimoService();
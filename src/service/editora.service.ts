import { getConnection } from 'typeorm';
import EditoraRepository from '../repositories/editora';

class EditoraService 
{
  async create(nome: string, endereco: string, num_telefone: string, email: string, site: string, ano_fundacao: number)
  {
    // estabelece conexão com banco de dados
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    const editora: any = { nome, endereco, num_telefone, email, site, ano_fundacao }; // cria objeto com os dados do editora
    
    try 
    {
      // verifica se autor já está cadastrado no banco de dados
      const verif_edit = await editoraRepo.findOne(editora);
      if (verif_edit) // se autor existir, então envia exceção
        throw new Error('Editora já cadastrada!');

      const editoraDb: any = await editoraRepo.save(editora);

      if (editoraDb)
        return editoraDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readEditoras()
  {
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    try 
    {
      const editoras = await editoraRepo.find();
      if (editoras)
        return editoras;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async readEditora(id: any) 
  {
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    try 
    {
      const editora_encontrado = await editoraRepo.findOne({ id });
      if (editora_encontrado) 
        return editora_encontrado; // retorna o editora encontrado
      else 
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async update(id: any, nome: string, endereco: string, num_telefone: string, email: string, site: string, ano_fundacao: number) 
  {
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    try 
    {
      const getEditora: any = await editoraRepo.findOne(id);
      if (!getEditora) 
        throw new Error('Editora não encontrada!');

      // atualiza o editora em questão com os dados enviados (não é obrigatório o envio de todos os dados)
      const editoraDb: any = await editoraRepo.update(
        { id, },
        {
          nome: nome ? nome : getEditora.nome,
          endereco: endereco ? endereco : getEditora.endereco,
          num_telefone: num_telefone ? num_telefone : getEditora.num_telefone,
          email: email ? email : getEditora.email,
          site: site ? site : getEditora.site,
          ano_fundacao: ano_fundacao ? ano_fundacao : getEditora.ano_fundacao
        }
      );
      if (editoraDb) 
        return editoraDb;
      else
        throw new Error('Operação não pode ser realizada!');
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }

  async delete(id: any) 
  {
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);
    const editora: any = { id };

    try 
    {
      const verifica_id = await editoraRepo.findOne({ id });
      if (!verifica_id) 
        throw new Error('Editora não encontrada!'); 
      
      const deleta_editora = await editoraRepo.delete(editora);

      if (!deleta_editora) 
        throw new Error('Operação não pode ser realizada!'); 

      return deleta_editora;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }  

  async searchByNameEditora(nome_editora: string) 
  {
    const connection = await getConnection();
    const editoraRepo: EditoraRepository = connection.getCustomRepository(EditoraRepository);

    try 
    {
      // verificar se editora existe por nome_editora
      const busca_editora: any = await editoraRepo
        .createQueryBuilder('editora')
        .where('editora.nome = :nome', { nome: nome_editora })
        .getOne();
      if(!busca_editora)
        throw new Error('Editora não encontrada!');

      return busca_editora;
    } 
    catch (e: any) 
    {
      throw new Error(e.message);
    }
  }
}

export default new EditoraService();
import { Request, Response, Router } from 'express';
import enviromentConfig from '../config/enviroment.config';

import { AutorController, EditoraController, LivroController } from '../controller/index.controller';

const routes = Router();
routes.get('/', async (request: Request, response: Response) => 
  {
    response.send(`Server running in ${enviromentConfig.app.port}`);
  }
);

routes.post('/autor/', AutorController.create); 
routes.get('/autor/', AutorController.readAutores); 
routes.get('/autor/:id', AutorController.readAutor); 
routes.put('/autor/:id', AutorController.updateAutor); 
routes.delete('/autor/:id', AutorController.deleteAutor); 
routes.get('/autor/', AutorController.searchByNameAutor); 

routes.post('/editora/', EditoraController.create); 
routes.get('/editora/', EditoraController.readEditoras); 
routes.get('/editora/:id', EditoraController.readEditora); 
routes.put('/editora/:id', EditoraController.updateEditora); 
routes.delete('/editora/:id', EditoraController.deleteEditora); 
routes.get('/editora/', EditoraController.searchByNameEditora); 

routes.post('/livro/', LivroController.create); 
routes.get('/livro/', LivroController.readLivros); 
routes.get('/livro/:id', LivroController.readLivro); 
routes.put('/livro/:id', LivroController.updateLivro); 
routes.delete('/livro/:id', LivroController.deleteLivro); 
routes.get('/livro/', LivroController.searchByNameLivro); 

export default routes;

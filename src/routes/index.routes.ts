import { Request, Response, Router } from 'express';
import enviromentConfig from '../config/enviroment.config';

import { AutorController, EditoraController, LivroController } from '../controller/index.controller';
import { AutorValidation, EditoraValidation, LivroValidation } from '../middlewares/validations/index.middleware';

const routes = Router();
routes.get('/', async (request: Request, response: Response) => 
  {
    response.send(`Server running in ${enviromentConfig.app.port}`);
  }
);

routes.get('/socoro',async (request: Request, response: Response) => {
  response.send("Socoro");
  }
);

routes.post('/autor/', AutorValidation.createAutor, AutorController.create); 
routes.get('/autor/', AutorController.readAutores); 
routes.get('/autor/:id', AutorValidation.readAutor, AutorController.readAutor); 
routes.put('/autor/:id', AutorValidation.updateAutor, AutorController.updateAutor); 
routes.delete('/autor/:id', AutorValidation.deleteAutor, AutorController.deleteAutor); 
routes.get('/autor/busca/:nome', AutorValidation.searchAutor, AutorController.searchByNameAutor); 

routes.post('/editora/', EditoraValidation.createEditora, EditoraController.create); 
routes.get('/editora/', EditoraController.readEditoras); 
routes.get('/editora/:id', EditoraController.readEditora); 
routes.put('/editora/:id', EditoraValidation.updateEditora, EditoraController.updateEditora); 
routes.delete('/editora/:id', EditoraValidation.deleteEditora, EditoraController.deleteEditora); 
routes.get('/editora/busca/:nome', EditoraValidation.searchEditora, EditoraController.searchByNameEditora); 

routes.post('/livro/', LivroValidation.createLivro, LivroController.create); 
routes.get('/livro/', LivroController.readLivros); 
routes.get('/livro/:id', LivroController.readLivro); 
routes.put('/livro/:id', LivroValidation.updateLivro, LivroController.updateLivro); 
routes.delete('/livro/:id', LivroValidation.deleteLivro, LivroController.deleteLivro); 
routes.get('/livro/busca/:nome', LivroValidation.searchLivro, LivroController.searchByNameLivro); 

export default routes;

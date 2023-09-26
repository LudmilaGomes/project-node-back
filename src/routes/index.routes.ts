import { Request, Response, Router } from 'express';
import enviromentConfig from '../config/enviroment.config';

import { AutorController } from '../controller/index.controller';
import { EditoraController } from '../controller/index.controller';

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

routes.post('/editora/', EditoraController.create); 
routes.get('/editora/', EditoraController.readEditoras); 
routes.get('/editora/:id', EditoraController.readEditora); 
routes.put('/editora/:id', EditoraController.updateEditora); 
routes.delete('/editora/:id', EditoraController.deleteEditora); 

export default routes;

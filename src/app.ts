import express from "express"; // importa framework Express
import routes from "./routes/index.routes";

// criação de instância de aplicativo (app); nela, configuramos routes e middleware
const app = express();
app.use(express.json());
// 'app.ts' criado para configurações posteriores...
app.use(routes);

export default app; // exportamos
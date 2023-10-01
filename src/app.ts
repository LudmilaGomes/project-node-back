import express from "express"; // importa framework Express
import routes from "./routes/index.routes";
import cors from "cors";
import bodyParser from "body-parser";

// criação de instância de aplicativo (app); nela, configuramos routes e middleware
const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static("temp"));
app.use(routes);

export default app; // exportamos
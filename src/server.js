import { Node_Router } from "../node-router/index.js";
import { AppController } from "./routes.js";

const app = new Node_Router();

app.get("/", (request, response) => {
  console.log("Função acionada do router", request.method);

  return { message: true };
});

app.post("/create", new AppController().execute);

app.start("127.0.0.1", 3001, () => console.log("Server is on port 3001"));

import TodoController from "../controllers/todo-controller";
import { FastifyInstance } from "fastify";
import TodoSchema from "../schema/todo-schema";

const controller = new TodoController();

async function routes(server: FastifyInstance) {
    

    server.get("/", controller.getTodo);
    server.post("/", controller.createTodo);
    server.get("/:id", TodoSchema, controller.whereTodo);
    server.put("/update/:id", TodoSchema, controller.updateTodo);
    server.delete('/delete/:id', TodoSchema, controller.deleteTodo);
}

export default routes;
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import TodoRoutes from "./routes/todo-routes";

const prisma = new PrismaClient();
const app = fastify({
    logger: true
});

const host: string = String(process.env.APP_HOST);
const port: number = Number(process.env.APP_PORT);

app.get('/', (req, res: FastifyReply) => {
    res.send(`Server running on port ${port}`);
});

app.register(TodoRoutes, { prefix: "api/todo" });

app.listen(port, host, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server running on host ${host} & port ${port}`);
});

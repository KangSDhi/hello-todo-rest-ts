import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";


export default class TodoController {

    prisma  = new PrismaClient();

    getTodo = async (req: FastifyRequest, res: FastifyReply) => {
        const todos = await this.prisma.todo.findMany();
        res
        .send({
            success: true,
            data: todos
        })
        .code(200);
    }

    createTodo = async (req: FastifyRequest, res: FastifyReply) => {
        const { judul, catatan }: any = req.body;
        const todo = await this.prisma.todo.create({
            data: {
                judul,
                catatan
            }
        });
        res.status(201).send({
            success: true,
            data: todo
        });
    }

    whereTodo =  async (req: FastifyRequest, res: FastifyReply) => {
        const { id }: any = req.params;
        const _id: number = id as number;
        const todo = await this.prisma.todo.findUnique({
            where: {
                id: Number(_id)
            }
        });
        res.send({
            success: true,
            data: todo
        })
        .code(200);
    }

    updateTodo = async (req: FastifyRequest, res: FastifyReply) => {
        const { id }: any = req.params;
        const { judul, catatan }: any = req.body;
        const _id = id as number;
        const _judul = judul as string;
        const _catatan = catatan as string;
        const todo = await this.prisma.todo.update({
            where: {
                id: _id
            },
            data: {
                judul: _judul,
                catatan: _catatan
            }
        });
        res.status(200).send({
            success: true,
            message: "Berhasil Mengubah Data",
            data: todo
        });
    }

    deleteTodo = async (req: FastifyRequest, res: FastifyReply) => {
        const { id }: any = req.params;
        const _id = id as number;
        try {
            const todo = await this.prisma.todo.delete({
                where: {
                    id: _id
                }
            });
            res.status(201).send({
                success: true,
                message: "Berhasil Menghapus Data",
                data: todo
            });   
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error
            });
        }
    }
}
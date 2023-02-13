import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ShortuniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })
    
    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
        /*
        Um forma de filtragem no banco maravilhosa como prima:
        const pools = await prisma.pool.findMany({
            where: {
                code: {
                    startsWith: 'J'
                }
            }
        })
        */    
        return { count }
    })

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()
          
        return { count }
    })

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()
          
        return { count }
    })

    fastify.post('/pools', async (request, reply) => {
            const createPoolBody = z.object({
                title: z.string(),
            })

            const { title } = createPoolBody.parse(request.body)

            const generate = new ShortuniqueId({ length: 6 })
            const code = String(generate()).toUpperCase()

            await prisma.pool.create({
                data: {
                    title,
                    code
                }
            })


            return reply.status(201).send({ code })

            // * Criar um try catch com base nas aplicações anteriores. ^^
    })

    await fastify.listen({ port: 3333, /*host: '0.0.0.0' */})
}

bootstrap()
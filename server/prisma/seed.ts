import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://github.com/lopeswestphal.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Bolao',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-10T14:00:00.291Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-12T14:00:00.291Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AG',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
    /*
    const participant = await prisma.participant.create({
        data: {
            poolId: pool.id,
            userId: user.id,
        }
    })
    */
}

main()
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { KGNBEntity } from './kgnb.entity';
import { GqlAuthPowerGuard, PowerKGNB } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class KgnbResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    @Query(() => [KGNBEntity])
    getRandomKGNB() {
        return this.prismaService.$queryRaw`
            SELECT *
            FROM kgnb
            ORDER BY RAND()
            LIMIT 20
        `
    }

    @Query(() => [KGNBEntity])
    getAllKGNB() {
        return this.prismaService.kGNB.findMany({
            orderBy: {
                id: "desc"
            }
        })
    }

    @Mutation(() => KGNBEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerKGNB))
    insertKGNB(
        @Args("context") context: string,
        @Args("commit", { nullable: true }) commit: string
    ) {
        return this.prismaService.kGNB.create({
            data: {
                context,
                commit
            }
        })
    }

    @Mutation(() => KGNBEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerKGNB))
    updateKGNB(
        @Args("id") id: number,
        @Args("context") context: string,
        @Args("commit", { nullable: true }) commit: string
    ) {
        return this.prismaService.kGNB.update({
            where: {
                id
            },
            data: {
                context,
                commit
            }
        })
    }
}

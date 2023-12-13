import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { DynamicEntity } from './dynamic.entity';
import { GqlAuthPowerGuard, GqlCurrentUser, PowerDynamic } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { DynamicService } from './dynamic.service';

@Resolver()
export class DynamicResolver {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly dynamicService: DynamicService
    ) { }

    // @Mutation(() => DynamicEntity)
    // @UseGuards(new GqlAuthPowerGuard(PowerDynamic, 2))
    // insertDynamic(
    //     @Args("title") title: string,
    //     @Args("context") context: string
    // ) { 
    //     this.prismaService.dynamic.create({

    //     })   
    // }

    @Mutation(() => DynamicEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerDynamic))
    async updateDynamic(
        @Args("id") id: number,
        @Args("title") title: string,
        @Args("context") context: string,
        @GqlCurrentUser() user: UserEntity
    ) {
        const e = await this.prismaService.dynamic.update({
            where: {
                id,
                userId: user.id
            },
            data: {
                title
            }
        })
        console.log(e);
        return e;
    }

    // @Mutation(() => DynamicEntity)
    // @UseGuards(new GqlAuthPowerGuard(PowerDynamic, 3))
    // updateOtherDynamic(
    //     @Args("id") id: number,
    //     @Args("title") title: string,
    //     @Args("context") context: string,
    //     @GqlCurrentUser() user: UserEntity
    // ) {

    // }
}

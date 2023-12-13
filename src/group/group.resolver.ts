import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthPowerGuard, GqlCurrentUser, PowerGroup } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from './group.entity';

@Resolver()
export class GroupResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    @Mutation(() => GroupEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerGroup, 2))
    createGroup(
        @GqlCurrentUser() user: UserEntity,
        @Args("name") name: string,
        @Args("description", { nullable: true }) description: string
    ) {
        return this.prismaService.group.create({
            data: {
                name,
                description,
                leader: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
    }

    @Mutation(() => GroupEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerGroup, 1))
    updateGroup(
        @GqlCurrentUser() user: UserEntity,
        @Args("id") id: number,
        @Args("name") name: string,
        @Args("description", { nullable: true }) description: string
    ) {
        return this.prismaService.group.update({
            where: {
                id,
                userId: user.id
            },
            data: {
                name,
                description
            }
        })
    }

    @Mutation(() => GroupEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerGroup, 3))
    updateOtherGroup(
        @Args("id") id: number,
        @Args("name") name: string,
        @Args("description", { nullable: true }) description: string
    ) {
        return this.prismaService.group.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })
    }

    @Mutation(() => GroupEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerGroup, 1))
    deleteGroup(
        @GqlCurrentUser() user: UserEntity,
        @Args("id") id: number
    ) {
        return this.prismaService.group.delete({
            where: {
                id,
                userId: user.id
            }
        })
    }
    @Mutation(() => GroupEntity)
    @UseGuards(new GqlAuthPowerGuard(PowerGroup, 3))
    deleteOtherGroup(
        @Args("id") id: number
    ) {
        return this.prismaService.group.delete({
            where: {
                id
            }
        })
    }


    @Query()
    getMyGroup() { }

    @Query()
    getGroupByUser() { }

    @Query()
    getUserGroup() { };
}

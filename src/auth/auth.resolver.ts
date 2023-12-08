import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlAuthGuard, GqlCurrentUser } from './auth.guard';
import { cryptoPassword } from 'src/libs/hash';
import { ForbiddenError } from '@nestjs/apollo';
import { AuthService } from './auth.service';
import { Test } from './entitys/test.entity';
import { UserEntity } from 'src/user/user.entity';

@Resolver(of => UserEntity)
export class AuthResolver {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) { }

    @Query(() => UserEntity)
    @UseGuards(GqlAuthGuard)
    getInfo(
        @GqlCurrentUser() user: UserEntity
    ) {
        console.log(user)
        return user;
    }

    @Mutation(() => UserEntity)
    async loginEmailPassword(
        @Args("email") email: string,
        @Args("password") password: string
    ) {
        const user: UserEntity = await this.prismaService.user.findFirst({
            where: {
                profile: {
                    email
                }
            },
            include: {
                profile: true
            }
        })
        const pwd = cryptoPassword(password);
        if (!user) {
            const res: UserEntity = await this.prismaService.user.create({
                data: {
                    profile: {
                        create: {
                            email,
                            password: pwd
                        }
                    }
                }
            })
            res.token = this.authService.getToken(res).access_token;
            return res;
            throw new ForbiddenError("Not found")
        }
        if (user.profile.password !== pwd) throw new ForbiddenError("Password error")
        user.token = this.authService.getToken(user).access_token;
        return user;
    }

    @Query(() => Test)
    async test() {
        return {
            now: Date.now(),
            msg: "hello world"
        }
    }

    @Query(() => [UserEntity])
    userList() {
        return this.prismaService.user.findMany({
            orderBy: {
                id: "desc"
            },
            include: {
                profile: true
            }
        })
    }
}

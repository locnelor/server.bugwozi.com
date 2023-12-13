import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './post.entity';
import { ForbiddenError } from '@nestjs/apollo';
import { cryptoPassword } from 'src/libs/hash';
import { GqlCurrentUser } from 'src/auth/auth.guard';
import { UserEntity } from 'src/user/user.entity';

@Resolver()
export class PostsResolver {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    @Mutation(() => PostEntity)
    async publishPost(
        @Args("title") title: string,
        @Args("subTitle") subTitle: string,
        @Args("context") context: string,
        @Args("tags") tags: string,
        @GqlCurrentUser() user: UserEntity
    ) {
        console.log(title, subTitle)
        console.log(context)
        console.log(tags)
        const hash_key = cryptoPassword(`${Date.now()}${Math.random()}${title}${subTitle}${context}`)
        // await this.prismaService.posts.create({
        //     data: {
        //         title,
        //         subTitle,
        //         hash_key,
        //         user: {
        //             connect: user
        //         }
        //     }
        // })
        const data = JSON.parse(context);

        throw new ForbiddenError("sbppk")
    }

}

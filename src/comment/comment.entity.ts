import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { DynamicEntity } from "src/dynamic/dynamic.entity";
import { PostEntity } from "src/posts/post.entity";
import { UserEntity } from "src/user/user.entity";



@ObjectType()
export class CommentEntity extends BaseEntity implements Comment {
    @Field()
    context: string;
    
    @Field(() => Int, { nullable: true })
    dynamicId: number;

    @Field(() => DynamicEntity, { nullable: true })
    dynamic: DynamicEntity

    @Field(() => Int, { nullable: true })
    postsId: number;

    @Field(() => PostEntity, { nullable: true })
    post: PostEntity

    @Field(() => Int)
    userId: number;

    @Field(() => UserEntity)
    user: UserEntity
}
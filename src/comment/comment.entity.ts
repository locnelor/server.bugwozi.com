import { Field, ObjectType } from "@nestjs/graphql";
import { Comment } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";



@ObjectType()
export class CommentEntity extends BaseEntity implements Comment {
    userId: number;

    @Field(() => UserEntity)
    user: UserEntity
}
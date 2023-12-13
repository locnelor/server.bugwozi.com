import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Dynamic } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";


@ObjectType()
export class DynamicEntity extends BaseEntity implements Dynamic {
    @Field(() => Int)
    priv: boolean;

    @Field()
    title: string;

    @Field(() => UserEntity)
    user: UserEntity

    userId: number;

    @Field(() => Int)
    view: number;

    commentId: number;
}
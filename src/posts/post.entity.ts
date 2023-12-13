import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Posts } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";



@ObjectType()
export class PostEntity extends BaseEntity implements Posts {
    @Field(() => Int)
    userId: number;

    @Field(() => UserEntity)
    user: UserEntity

    @Field()
    title: string;

    @Field()
    hash_key: string;

    @Field()
    subTitle: string;

    @Field({ nullable: true })
    context?: string
}
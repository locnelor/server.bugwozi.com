import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Message } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";
import { GroupEntity } from "../group.entity";



@ObjectType()
export class MessageEntity extends BaseEntity implements Message {
    @Field(() => UserEntity)
    user: UserEntity

    @Field(() => Int)
    userId: number;

    @Field(() => GroupEntity, { nullable: true })
    group: GroupEntity

    @Field(() => Int)
    groupId: number;

    @Field()
    context: string;
}
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserOnGroup } from "@prisma/client";
import { UserEntity } from "src/user/user.entity";
import { GroupEntity } from "./group.entity";

@ObjectType()
export class UserOnGroupEntity implements UserOnGroup {
    @Field(() => Int)
    userId: number;

    @Field(() => UserEntity, { nullable: true })
    user: UserEntity

    @Field(() => Int)
    groupId: number;

    @Field(() => GroupEntity, { nullable: true })
    group: GroupEntity

    @Field()
    isAdmin: boolean;

    @Field()
    isBan: boolean;

    @Field()
    hash_key: string
}
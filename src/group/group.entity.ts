import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Group, UserOnGroup } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";



@ObjectType()
export class GroupEntity extends BaseEntity implements Group {
    @Field()
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field(() => UserOnGroupEntity)
    userOnGroup: UserOnGroupEntity

    @Field(() => UserEntity)
    leader: UserEntity

    @Field(() => Int)
    userId: number;
}

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
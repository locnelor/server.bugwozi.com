import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Group, UserOnGroup } from "@prisma/client";
import { BaseEntity } from "src/base.entity";
import { UserEntity } from "src/user/user.entity";
import { UserOnGroupEntity } from "./groupOnUser.entity";



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


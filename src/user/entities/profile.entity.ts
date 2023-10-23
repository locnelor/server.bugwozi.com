import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { ProfileModel } from "@prisma/client"

@ObjectType()
export class ProfileEntity implements ProfileModel {
    @Field()
    lastLogin: Date;

    @Field(() => Int)
    userModelId: number;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    qq: string;

    @Field({ nullable: true })
    wechat: string;

    @Field(() => Float)
    role: bigint;

    @Field(() => ID)
    id: number;

    @Field()
    userId: number;

    password: string;
}
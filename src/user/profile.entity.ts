import { Field, ObjectType } from "@nestjs/graphql";
import { Profile } from "@prisma/client";

@ObjectType()
export class ProfileEntity implements Profile {
    @Field()
    email: string;

    @Field()
    qq: string;

    @Field()
    phone: string;

    @Field()
    id: number;

    @Field()
    userId: number;

    password: string;
}
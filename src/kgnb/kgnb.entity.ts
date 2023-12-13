import { Field, ObjectType } from "@nestjs/graphql";
import { KGNB } from "@prisma/client";
import { BaseEntity } from "src/base.entity";

@ObjectType()
export class KGNBEntity extends BaseEntity implements KGNB {
    @Field()
    context: string;

    @Field({ nullable: true })
    commit: string;
}
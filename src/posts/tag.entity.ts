import { Field, ObjectType } from "@nestjs/graphql";
import { Tag } from "@prisma/client";
import { BaseEntity } from "src/base.entity";


@ObjectType()
export class TagEntity extends BaseEntity implements Tag{
    @Field()
    name: string;
}
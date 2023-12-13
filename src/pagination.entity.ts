import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class PaginationEntity {
    @Field(() => Int)
    page: number

    @Field(() => Int)
    limit: number

    @Field(() => Int)
    count: number
}
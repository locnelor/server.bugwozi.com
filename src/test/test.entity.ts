import { Field, Float, Int, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class TestEntity {

    @Field(() => Int)
    id: number

    @Field(() => Float)
    random: number

    @Field()
    ranStr: string
}
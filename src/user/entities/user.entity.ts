import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from "@prisma/client"
import { ProfileEntity } from './profile.entity';

@ObjectType()
export class UserEntity implements UserModel {
  @Field()
  hash_key: string;

  @Field({ nullable: true })
  classesModelId: number;

  @Field({ nullable: true })
  address: string;

  @Field(() => Int)
  id: number;

  @Field()
  name: string

  @Field()
  createAt: Date;

  @Field()
  updateAt: Date;

  @Field({ nullable: true })
  token?: string

  @Field()
  account: string;

  @Field()
  profile: ProfileEntity
}
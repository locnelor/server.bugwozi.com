import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProfileEntity } from './profile.entity';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/base.entity';

@ObjectType()
export class UserEntity extends BaseEntity implements User {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  token?: string

  // @Field()
  // account: string;

  @Field(() => ProfileEntity, { nullable: true })
  profile?: ProfileEntity
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProfileEntity } from './profile.entity';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/base.entity';
import { GroupEntity } from 'src/group/group.entity';

@ObjectType()
export class UserEntity extends BaseEntity implements User {
  @Field()
  address: string;

  @Field(() => [GroupEntity], { nullable: true })
  group?: GroupEntity[]

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  token?: string

  @Field()
  role: number

  @Field(() => ProfileEntity, { nullable: true })
  profile?: ProfileEntity
}

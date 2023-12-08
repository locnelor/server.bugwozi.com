import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CurrentUser, GqlAuthGuard, GqlCurrentUser } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  viewer(
    @GqlCurrentUser() user: UserEntity,
  ) {
    return user;
  }
}

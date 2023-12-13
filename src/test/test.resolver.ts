import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestEntity } from './test.entity';
import { TestService } from './test.service';
import { ForbiddenError } from '@nestjs/apollo';
import { GqlAuthPowerGuard, PowerAccount, PowerCommit, PowerSize } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class TestResolver {
    constructor(
        private readonly testService: TestService
    ) { }

    @Query(() => TestEntity)
    getTestQuery() {
        console.log("--------", Math.random())
        return this.testService.getRanTest()
    }

    @Mutation(() => [TestEntity])
    getTestMutation(
        @Args("ranStrLen") ranStrLen: number,
        @Args("num") num: number,
        @Args("count") count: number
    ) {
        return new Array(count).fill(0).map(() => this.testService.getRanTest(ranStrLen, num))
    }

    @Query(() => TestEntity)
    getErrorQuery() {
        throw new ForbiddenError("throw error")
        return this.testService.getRanTest()
    }

    @Mutation(() => TestEntity)
    getErrorMutation() {
        throw new ForbiddenError("throw error")
        return this.testService.getRanTest()
    }

    @UseGuards(new GqlAuthPowerGuard(PowerAccount))
    @Query(() => TestEntity)
    accountPower() {
        return this.testService.getRanTest()
    }

    @UseGuards(new GqlAuthPowerGuard(PowerCommit))
    @Query(() => TestEntity)
    commitPower() {
        return this.testService.getRanTest();
    }
    
    @UseGuards(new GqlAuthPowerGuard(PowerSize))
    @Query(() => TestEntity)
    powerSize() {
        return this.testService.getRanTest();
    }

}